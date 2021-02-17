// @ts-ignore
import { SVG } from '@svgdotjs/svg.js'

export default ({ _app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('svg', SVG)
}

// const points = new Map()
// const lines = new Map()
// const pointObjects = new Map()

// config.nodes.forEach((node) => {
//   if (node.position)
//     points.set(
//       node.type == 'switch'
//         ? node.id.toString()
//         : node.name
//         ? node.name
//         : `PT${node.id}`,
//       node
//     )
// })

// console.log(points)

// const s = SVG().addTo('#svg').size('100%', '100%')
// // Lets create big circle in the middle:

// points.forEach((point, key) => {
//   if (point.type == 'point') {
//     const neighbor1 = points.get(point.left ? point.left.toString() : null)
//     const neighbor2 = points.get(point.right ? point.right.toString() : null)

//     // console.log(neighbor)

//     if (!key.toLowerCase().endsWith('-s')) {
//       s.text(key)
//         .move(point.position.x * 50, point.position.y * 50 - 30)
//         .font({
//           fill: '#3D3D3D',
//           family: 'Arial',
//           weight: 700,
//           size: '16px',
//         })
//     }

//     if (neighbor1) {
//       drawNeighbor(s, point, neighbor1, key, getName(neighbor1))
//     }

//     if (neighbor2) {
//       drawNeighbor(s, point, neighbor2, key, getName(neighbor2))
//     }
//   } else if (point.type == 'switch') {
//     const neighbor1 = points.get(point.plus.node)
//     const neighbor2 = points.get(point.minus.node)
//     const neighbor3 = points.get(point.back.node)

//     if (neighbor1) {
//       drawNeighbor(s, point, neighbor1, key, getName(neighbor1))
//     }

//     if (neighbor2) {
//       drawNeighbor(s, point, neighbor2, key, getName(neighbor2))
//     }

//     if (neighbor3) {
//       drawNeighbor(s, point, neighbor3, key, getName(neighbor3))
//     }

//     if (point.orientation == 'down') {
//       s.text(key)
//         .move(point.position.x * 50, point.position.y * 50 - 30)
//         .font({
//           fill: '#3D3D3D',
//           family: 'Arial',
//           weight: 700,
//           size: '16px',
//         })
//     } else {
//       s.text(key)
//         .move(point.position.x * 50, point.position.y * 50 + 15)
//         .font({
//           fill: '#3D3D3D',
//           family: 'Arial',
//           weight: 700,
//           size: '16px',
//         })
//     }
//   }
// })

// points.forEach((point, key) => {
//   // const height = key.endsWith("-S") ? 14 : 15;

//   const height = 15
//   const width = 23

//   let rect

//   if (point.type == 'switch') {
//     // const width = checkVertical(point) ? 8.5 : 23

//     rect = s.rect(checkVertical(point) ? width - 2 : width, height)
//     rect.move(point.position.x * 50 - 5, point.position.y * 50 - 7.5)
//     rect.fill('#000')
//     console.log(rect)
//     // rect.transform("")
//     rect.transform({
//       skewX:
//         (point.facing == 'right' && point.orientation == 'up') ||
//         (point.orientation == 'down' && point.facing == 'left')
//           ? -45
//           : 45,
//       translate: {
//         x: -6,
//       },
//       rotate: checkVertical(point) ? -45 : 0,
//     })
//   } else {
//     rect = s.rect(width - 1, height)
//     rect.move(point.position.x * 50 - 11, point.position.y * 50 - 7.5)
//     rect.fill('#000')
//     // rect.stroke("#000")

//     const neighborRight = config.nodes.find((p) => getName(p) == point.right)
//     const neighborLeft = config.nodes.find((p) => getName(p) == point.left)

//     if (neighborRight && neighborLeft) {
//       if (
//         neighborRight.position.y != point.position.y &&
//         neighborLeft.position.y != point.position.y
//       ) {
//         if (neighborLeft.position.y > neighborRight.position.y) {
//           rect.transform({
//             rotate: 45,
//           })
//         } else {
//           rect.transform({
//             rotate: -45,
//           })
//         }
//       }
//     }

//     if (neighborRight && neighborRight.position.y != point.position.y) {
//       if (neighborRight.position.y < point.position.y) {
//         rect.transform({
//           skewX: -45,
//         })
//       } else {
//         rect.transform({
//           skewX: 45,
//         })
//       }
//     }

//     if (neighborLeft && neighborLeft.position.y != point.position.y) {
//       if (neighborLeft.position.y < point.position.y) {
//         rect.transform({
//           skewX: 45,
//         })
//       } else {
//         rect.transform({
//           skewX: -45,
//         })
//       }
//     }
//   }

//   pointObjects.set(key, rect)
// })

// function drawNeighbor(s, point, neighbor, pointName, neighborName) {
//   let pointLineData = lines.get(pointName)
//   let neighborLineData = lines.get(neighborName)

//   if (!pointLineData) {
//     lines.set(pointName, { lineObjects: [], neighbors: [] })
//     pointLineData = lines.get(pointName)
//   }

//   if (!neighborLineData) {
//     lines.set(neighborName, { lineObjects: [], neighbors: [] })
//     neighborLineData = lines.get(neighborName)
//   }

//   if (
//     !pointLineData.neighbors.includes(neighborName) &&
//     !neighborLineData.neighbors.includes(pointName)
//   ) {
//     const line = s.line(
//       point.position.x * 50,
//       point.position.y * 50,
//       neighbor.position.x * 50,
//       neighbor.position.y * 50
//     )
//     line.stroke({
//       color: 'black',
//       width: 15,
//     })
//     pointLineData.neighbors.push(neighborName)
//     pointLineData.lineObjects.push(line)
//   }
// }

// function getName(node) {
//   return node.type == 'switch'
//     ? node.id.toString()
//     : node.name
//     ? node.name
//     : `PT${node.id}`
// }

// function path(nodes) {
//   nodes.forEach((node, i) => {
//     console.log(node)

//     const lineNode = lines.get(node)
//     const nextNode = lines.get(nodes[i + 1])

//     pointObjects.get(node).fill('#FF0000').stroke({ color: '#FF0000' })

//     if (!nextNode) return

//     if (lineNode.neighbors.includes(nodes[i + 1])) {
//       const neighborIndex = lineNode.neighbors.indexOf(nodes[i + 1])
//       console.log(lineNode.lineObjects[neighborIndex])
//       lineNode.lineObjects[neighborIndex].stroke({ color: '#FF0000' })
//     }

//     if (nextNode.neighbors.includes(node)) {
//       const neighborIndex = nextNode.neighbors.indexOf(node)
//       nextNode.lineObjects[neighborIndex].stroke({ color: '#FF0000' })
//     }
//   })
// }

// function checkVertical(node) {
//   const y1 = points.get(node.minus.node).position.y
//   const y2 = points.get(node.plus.node).position.y
//   const y3 = points.get(node.back.node).position.y

//   if (y1 != y2 && y1 != y3 && y2 != y3) return true
// }

// const pathSet = [
//   /* "WLG", "3", "4", "5", "7", "10", "TT1", "16", "18", "19", "22", "23", "24", "25", "WPD" */
// ]
// // path(pathSet)

// fetch('http://192.168.0.150:5000/switches')
//   .then((res) => res.json())
//   .then((data) => {
//     data.forEach((node) => {
//       if (pathSet.includes(node.id.toString())) return

//       const state = node.state == 0 ? 'minus' : 'plus'

//       pointObjects
//         .get(node.id.toString())
//         .fill('#009933')
//         .stroke({ color: '#009933' })

//       const neighborNode = points.get(node.id.toString())[state].node.toString()

//       console.log(neighborNode)

//       const nodeLines = lines.get(node.id.toString())

//       console.log(nodeLines)

//       const neighborLines = lines.get(neighborNode)

//       console.log(neighborLines)

//       if (points.get(neighborNode).type == 'point') {
//         pointObjects
//           .get(neighborNode)
//           .fill('#009933')
//           .stroke({ color: '#009933' })
//       }

//       if (nodeLines.neighbors.includes(neighborNode)) {
//         nodeLines.lineObjects[
//           nodeLines.neighbors.indexOf(neighborNode)
//         ].stroke({ color: '#009933' })
//       }

//       if (neighborLines.neighbors.includes(node.id.toString())) {
//         neighborLines.lineObjects[
//           neighborLines.neighbors.indexOf(node.id.toString())
//         ].stroke({ color: '#009933' })
//       }
//       // --------------------------------------------------------------------------------------------------------------------------------------------------
//       // const neighborNode = config.nodes.find(p => getName(p) == node.id.toString())[state].node.toString()

//       // console.log(neighborNode)

//       // const neighbor = lines.get(getName(points.find(p => getName(p) == neighborNode)))
//       // const lineObject = lines.get(node.id.toString())

//       // console.log(node)
//       // console.log(neighbor)
//       // console.log(lineObject)

//       // if (lineObject.neighbors.includes(node.id.toString())) {
//       //     console.log(lineObject.lineObjects[neighbor.neighbors.indexOf(node.id.toString())])
//       //     lineObject.lineObjects[neighbor.neighbors.indexOf(node.id.toString())].stroke({ color: "#009933" })
//       // }

//       // if (neighbor.neighbors.includes(node.id.toString())) {
//       //     console.log(neighbor.lineObjects[neighbor.neighbors.indexOf(node.id.toString())])
//       //     neighbor.lineObjects[neighbor.neighbors.indexOf(node.id.toString())].stroke({ color: "#009933" })
//       // }
//     })
//   })

// s.transform('s2 0 0')
