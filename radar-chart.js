#! /usr/bin/env node

const fs = require('fs')

const color = '#d6616b'

const stdin = fs.readFileSync('/dev/stdin').toString()
const input = JSON.parse(stdin)

const draw = (id, d, options) => {
  const cfg = {
	  radius: 5,
	  w: 600,
	  h: 600,
	  factor: 1,
	  factorLegend: .85,
	  levels: 3,
	  maxValue: 0,
	  radians: 2 * Math.PI,
	  opacityArea: 0.2,
	  ToRight: 5,
	  TranslateX: 150,
	  TranslateY: 30,
	  ExtraWidthX: 100,
	  ExtraWidthY: 120,
	  color,
	}

  const config = Object.assign({}, cfg, options)

  const occurrences = input.reduce((acc, { mood }) => {
    const count = acc[mood] || 0
    return Object.assign({}, acc, { [mood]: count + 1 })
  }, {})

  console.log(occurrences)
}
const chart = { draw }

// TODO: provide to d3 somehow?
draw()
