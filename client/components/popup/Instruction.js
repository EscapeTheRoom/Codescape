import React from 'react'
import Problem from './Problem'
import TestResult from './TestResult'

const Instruction = props => {
  return (
    <div>
      <Problem id={props.match.params.problemId} />
      <TestResult />
    </div>
  )
}

export default Instruction
