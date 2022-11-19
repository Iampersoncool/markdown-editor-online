const editor = ace.edit('editor');
editor.session.setMode('ace/mode/markdown');
editor.session.setTabSize(2);
editor.setTheme('ace/theme/one_dark');

const output = document.querySelector('.output__code');

const markdownValue = localStorage.getItem('markdownValue');
if (markdownValue) {
  editor.setValue(markdownValue);
  output.innerHTML = marked.parse(markdownValue);
} else {
  const value = `

  # hello world

  **Edit this text**

  [Link](https://www.example.com)

  `.trim();

  editor.setValue(value);

  output.innerHTML = marked.parse(editor.getValue());
}

editor.session.on('change', () => {
  const value = editor.getValue();

  output.innerHTML = marked.parse(value);
  localStorage.setItem('markdownValue', value);
});
