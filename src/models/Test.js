export default class Test {
  constructor(input, output) {
    this.input = this.correctData(input);
    this.output = this.correctData(output);
  }

  setInput(data) {
    this.input = this.correctData(data);
  }

  setOutput(data) {
    this.output = this.correctData(data);
  }

  correctData(data) {
    // Replace all <br>'s with \n
    const correctedData = data.replace(/<br>/g, '\n');

    // Make sure the data ends with a newline
    return correctedData.endsWith('\n') ? correctedData : correctedData + '\n';
  }
}
