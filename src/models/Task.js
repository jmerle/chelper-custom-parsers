export default class Task {
  constructor(taskName, contestName, tests, memoryLimit) {
    this.taskName = taskName;
    this.contestName = contestName;
    this.tests = tests;
    this.memoryLimit = memoryLimit;
  }
}
