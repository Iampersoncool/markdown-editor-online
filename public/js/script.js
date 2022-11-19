const editor = ace.edit('editor');
editor.session.setMode('ace/mode/markdown');
editor.session.setTabSize(2);

const output = document.querySelector('.output__code');

const value = `

# hello world

**Edit this text**

[Link](https://www.example.com)

`.trim();

editor.setValue(value);
editor.setTheme('ace/theme/one_dark');

output.innerHTML = marked.parse(editor.getValue());

editor.session.on('change', () => {
  output.innerHTML = marked.parse(editor.getValue());
});
