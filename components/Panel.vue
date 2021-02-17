<template>
  <svg id="svg" ref="panel" preserveAspectRatio="xMidYMid meet"></svg>
</template>

<script>
export default {
  name: 'Panel',
  data() {
    return {
      config: null,
      s: null,
      points: new Map(),
      lines: new Map(),
      pointObjects: new Map()
    }
  },
  async mounted() {
    this.config = await this.$axios.$get('/config')
    this.s = this.$svg('#svg') /* .size('100%', '100%') */
    await this.config.nodes.forEach((node) => {
      if (node.position)
        this.points.set(
          node.type === 'switch'
            ? node.id.toString()
            : node.name
            ? node.name
            : `PT${node.id}`,
          node
        )
    })

    this.drawPanel()
    this.updatePanel()


    const bbox = this.s.bbox()

    const width = bbox.x + bbox.width + bbox.x
    const height = bbox.y + bbox.height + bbox.y

    this.s.width(width > window.screen.width ? window.screen.width : width)
    this.s.height(height > window.screen.height ? window.screen.height : height)

  },
  methods: {
    refresh() {
      this.s.clear()
      this.lines = new Map()
      this.pointObjects = new Map()
      this.drawPanel()
      this.updatePanel()
      this.path(this.$store.state.path.setPath)
    },
    drawPanel() {
      this.points.forEach((point, key) => {
        if (point.type === 'point') {
          const neighbor1 = this.points.get(
            point.left ? point.left.toString() : null
          )
          const neighbor2 = this.points.get(
            point.right ? point.right.toString() : null
          )

          // console.log(neighbor)

          if (!key.toLowerCase().endsWith('-s')) {
            this.s
              .text(key)
              .move(point.position.x * 50, point.position.y * 50 - 30)
              .font({
                fill: '#3D3D3D',
                family: 'Arial',
                weight: 700,
                size: '16px',
              })
          }

          if (neighbor1) {
            this.drawNeighbor(
              this.s,
              point,
              neighbor1,
              key,
              this.getName(neighbor1)
            )
          }

          if (neighbor2) {
            this.drawNeighbor(
              this.s,
              point,
              neighbor2,
              key,
              this.getName(neighbor2)
            )
          }
        } else if (point.type === 'switch') {
          const neighbor1 = this.points.get(point.plus.node)
          const neighbor2 = this.points.get(point.minus.node)
          const neighbor3 = this.points.get(point.back.node)

          if (neighbor1) {
            this.drawNeighbor(
              this.s,
              point,
              neighbor1,
              key,
              this.getName(neighbor1)
            )
          }

          if (neighbor2) {
            this.drawNeighbor(
              this.s,
              point,
              neighbor2,
              key,
              this.getName(neighbor2)
            )
          }

          if (neighbor3) {
            this.drawNeighbor(
              this.s,
              point,
              neighbor3,
              key,
              this.getName(neighbor3)
            )
          }

          if (point.orientation === 'down') {
            this.s
              .text(key)
              .move(point.position.x * 50, point.position.y * 50 - 30)
              .font({
                fill: '#3D3D3D',
                family: 'Arial',
                weight: 700,
                size: '16px',
              })
          } else {
            this.s
              .text(key)
              .move(point.position.x * 50, point.position.y * 50 + 15)
              .font({
                fill: '#3D3D3D',
                family: 'Arial',
                weight: 700,
                size: '16px',
              })
          }
        }
      })

      this.points.forEach((point, key) => {
        // const height = key.endsWith("-S") ? 14 : 15;

        const height = 15
        const width = 23

        let rect

        if (point.type === 'switch') {
          // const width = checkVertical(point) ? 8.5 : 23

          rect = this.s.rect(
            this.checkVertical(point) ? width - 2 : width,
            height
          )
          rect.move(point.position.x * 50 - 5, point.position.y * 50 - 7.5)
          rect.fill('#000')
          // rect.transform("")
          rect.transform({
            skewX:
              (point.facing === 'right' && point.orientation === 'up') ||
              (point.orientation === 'down' && point.facing === 'left')
                ? -45
                : 45,
            translate: {
              x: -6,
            },
            rotate: this.checkVertical(point) ? -45 : 0,
          })
        } else {
          rect = this.s.rect(width - 1, height)
          rect.move(point.position.x * 50 - 11, point.position.y * 50 - 7.5)
          rect.fill('#000')
          // rect.stroke("#000")

          const neighborRight = this.config.nodes.find(
            // eslint-disable-next-line eqeqeq
            (p) => this.getName(p) == point.right
          )
          const neighborLeft = this.config.nodes.find(
            // eslint-disable-next-line eqeqeq
            (p) => this.getName(p) == point.left
          )

          if (neighborRight && neighborLeft) {
            if (
              neighborRight.position.y !== point.position.y &&
              neighborLeft.position.y !== point.position.y
            ) {
              if (neighborLeft.position.y > neighborRight.position.y) {
                rect.transform({
                  rotate: 45,
                })
              } else {
                rect.transform({
                  rotate: -45,
                })
              }
            }
          }

          //   alert('a')
          if (neighborRight && neighborRight.position.y !== point.position.y) {
            if (neighborRight.position.y < point.position.y) {
              rect.transform({
                skewX: -45,
              })
            } else {
              rect.transform({
                skewX: 45,
              })
            }
          }

          if (neighborLeft && neighborLeft.position.y !== point.position.y) {
            if (neighborLeft.position.y < point.position.y) {
              rect.transform({
                skewX: 45,
              })
            } else {
              rect.transform({
                skewX: -45,
              })
            }
          }
        }

        this.pointObjects.set(key, rect)
      })
    },
    drawNeighbor(s, point, neighbor, pointName, neighborName) {
      let pointLineData = this.lines.get(pointName)
      let neighborLineData = this.lines.get(neighborName)

      if (!pointLineData) {
        this.lines.set(pointName, { lineObjects: [], neighbors: [] })
        pointLineData = this.lines.get(pointName)
      }

      if (!neighborLineData) {
        this.lines.set(neighborName, { lineObjects: [], neighbors: [] })
        neighborLineData = this.lines.get(neighborName)
      }

      if (
        !pointLineData.neighbors.includes(neighborName) &&
        !neighborLineData.neighbors.includes(pointName)
      ) {
        const line = s.line(
          point.position.x * 50,
          point.position.y * 50,
          neighbor.position.x * 50,
          neighbor.position.y * 50
        )
        line.stroke({
          color: 'black',
          width: 15,
        })
        pointLineData.neighbors.push(neighborName)
        pointLineData.lineObjects.push(line)
      }
    },
    getName(node) {
      return node.type === 'switch'
        ? node.id.toString()
        : node.name
        ? node.name
        : `PT${node.id}`
    },
    path(nodes) {
      this.$store.commit('path/set', nodes)
      nodes.forEach((node, i) => {
        const lineNode = this.lines.get(node)
        const nextNode = this.lines.get(nodes[i + 1])

        this.pointObjects.get(node).fill('#FF0000').stroke({ color: '#FF0000' })

        if (!nextNode) return

        if (lineNode.neighbors.includes(nodes[i + 1])) {
          const neighborIndex = lineNode.neighbors.indexOf(nodes[i + 1])
          lineNode.lineObjects[neighborIndex].stroke({ color: '#FF0000' })
        }

        if (nextNode.neighbors.includes(node)) {
          const neighborIndex = nextNode.neighbors.indexOf(node)
          nextNode.lineObjects[neighborIndex].stroke({ color: '#FF0000' })
        }
      })
    },
    checkVertical(node) {
      const y1 = this.points.get(node.minus.node).position.y
      const y2 = this.points.get(node.plus.node).position.y
      const y3 = this.points.get(node.back.node).position.y

      if (y1 !== y2 && y1 !== y3 && y2 !== y3) return true
    },
    updatePanel() {
      this.$axios.$get('/switches').then((data) => {
        data.forEach((node) => {
          if (this.$store.state.path.setPath.includes(node.id.toString())) return

          const state = node.state === 0 ? 'minus' : 'plus'

          this.pointObjects
            .get(node.id.toString())
            .fill('#009933')
            .stroke({ color: '#009933' })

          const neighborNode = this.points
            .get(node.id.toString())
            [state].node.toString()

          const nodeLines = this.lines.get(node.id.toString())

          const neighborLines = this.lines.get(neighborNode)

          if (this.points.get(neighborNode).type === 'point') {
            this.pointObjects
              .get(neighborNode)
              .fill('#009933')
              .stroke({ color: '#009933' })
          }

          if (nodeLines.neighbors.includes(neighborNode)) {
            nodeLines.lineObjects[
              nodeLines.neighbors.indexOf(neighborNode)
            ].stroke({ color: '#009933' })
          }

          if (neighborLines.neighbors.includes(node.id.toString())) {
            neighborLines.lineObjects[
              neighborLines.neighbors.indexOf(node.id.toString())
            ].stroke({ color: '#009933' })
          }
        })
      })
    },
  },
}
</script>
