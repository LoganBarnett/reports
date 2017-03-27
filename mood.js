#! /usr/bin/env node
// @flow

// mood.js reads my journal entries and outputs the mood and date in a json
// file.

const fs = require('fs')
const path = require('path')
const util = require('util')
const process = require('process')

const homeDir = process.env['HOME']
const files = fs.readdirSync(path.resolve(homeDir, 'notes/journal'))
// console.log(process.argv[2])
// const startTimeArg = process.argv[2].split('.')
// const startTime = new Date(startTimeArg[0], parseInt(startTimeArg[1]) - 1, startTimeArg[2])
// console.log(new Date(process.argv[2]))
// console.log(startTime)
const startTime = new Date(process.argv[2])

const journalMatch = /(\d{4})\.(\d{2})\.(\d{2})\.(\d{2})\.(\d{2})\.org/
const journalPotentialMatches = files.map((f) => f.match(journalMatch))
const journalMatches = journalPotentialMatches.filter(f => f != null)

const getMood = (fileName) => {
  const fileData = fs.readFileSync(fileName, 'utf-8')
  // try {
  return fileData.match(/^#\+MOOD: (.+)$/m)[1].toLowerCase()
  // }
  // catch(e) {
  //   console.log(fileName, fileData)
  // }
}

const getDate = (match) => {
  const [ _, year, month, day, hour, minute ] = match
  return new Date(year, parseInt(month) - 1, day, hour, minute)
}

const moodEntires = journalMatches.map(m => {
  const date = getDate(m).toJSON()
  // const originalDate = [m[1], m[2], m[3], m[4], m[5]].join('.')
  const absoluteFile = path.resolve(homeDir, 'notes/journal', m[0])
  const mood = getMood(absoluteFile)

  return { mood, date }
}).filter(({date}) => new Date(date).getTime() > startTime.getTime())

console.log(JSON.stringify(moodEntires))
