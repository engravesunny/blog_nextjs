'use client';

import React, { useEffect } from 'react';

// 内联代码高亮样式
const codeHighlightStyles = `
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #0d1117;
    color: #c9d1d9;
  }

  .hljs-comment,
  .hljs-quote {
    color: #8b949e;
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: #ff7b72;
  }

  .hljs-number,
  .hljs-literal,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag .hljs-attr {
    color: #79c0ff;
  }

  .hljs-string,
  .hljs-doctag {
    color: #a5d6ff;
  }

  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    color: #d2a8ff;
