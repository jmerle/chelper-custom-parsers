export default class Parser {
  /**
   * Sends the given task to CHelper.
   *
   * @param {Task} task
   */
  sendTask(task) {
    const html = `
      <script>
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:4243', true);
        xhr.setRequestHeader('Content-type', 'text/plain');
        xhr.send(\`${this.taskToCHelperCompatibleSource(task)}\`);
      </script>
    `.trim();

    const iframe = document.createElement('iframe');
    iframe.src = `data:text/html;charset=utf-8,${encodeURI(html)}`;

    document.body.appendChild(iframe);
    setTimeout(() => iframe.remove(), 500);
  }

  /**
   * Converts a task to a string which CHelper can parse into a task.
   *
   * @param {Task} task
   */
  taskToCHelperCompatibleSource(task) {
    const tests = task.tests.map(test => `
      <td><pre>${test.input}</pre></td>
      <td><pre>${test.output}</pre></td>
    `);

    return `csacademy
      <div class="text-center"><h1>${task.taskName}</h1></div>

      <br>Memory limit: <em>${task.memoryLimit} </em></br>

      ${tests}

      "contest":""
      "longName":"${task.contestName}"
    `;
  }
}
