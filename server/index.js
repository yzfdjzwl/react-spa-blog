const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/post/list', (req, res) => {
    res.send({
      postList: [
        {
          title: 'hahaha',
          content: 'memem',
          time: '1998',
        },
        {
          title: 'hahaha2',
          content: 'mememslkfjsklfdj',
          time: '1998',
        },
        {
          title: '我是测试',
          content: 'mememslkfjsklfdj',
          time: '1998',
        },
        {
          title: '我是测试2',
          content: 'mememslkfjsklfdj',
          time: '1998',
        },
        {
          title: '我是测试2',
          content: 'mememslkfjsklfdj',
          time: '1998',
        },
        {
          title: '我是测试2',
          content: 'mememslkfjsklfdj',
          time: '1998',
        },
        {
          title: '我是测试2',
          content: 'mememslkfjsklfdj',
          time: '1998',
        },
      ],
    });
});

app.listen(3000, () => {
    console.log('Server is listening 3000...');
});
