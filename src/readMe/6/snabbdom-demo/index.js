import { h, init } from 'snabbdom';
import eventlisteners from 'snabbdom/modules/eventlisteners';

let patch = init([eventlisteners]);

const data = [
  {
    id: 8,
    title: 'The Good, The Bad, ans the Ugly',
    desc: 'abalabalabalabala',
  },
  { id: 7, title: '12 Angry Men', desc: 'bbalabalabalabala' },
  { id: 10, title: 'Fight Club', desc: 'cbalabalabalabala' },
];

let app = document.querySelector('#app');

// 排序加渲染
function sortBy(by) {
  const sortData = by
    ? data.sort((v1, v2) => (v1[by] >= v2[by] ? 1 : -1))
    : data;
  const list = sortData.map(v =>
    h('li', { props: { key: v.id } }, [
      h('span', v.id),
      h('span', v.title),
      h('span', v.desc),
      h(
        'span',
        {
          on: {
            click: () => deleteItem(v.id),
          },
        },
        'X',
      ),
    ]),
  );
  const newVNode = h('div#app', [title, op, h('ul', [...list])]);
  app = patch(app, newVNode);
}

// 删除一项
function deleteItem(id) {
  const idx = data.findIndex(v => v.id === id);
  data.splice(idx, 1);
  sortBy();
}

// 增加一项
function addItem() {
  let id = `${(Math.random() + '').substring(5, 10)}_${(
    Date.now() + ''
  ).substring(6)}`;
  data.push({
    id: id,
    title: `${Math.random()}`.substring(5),
    desc: `${Math.random()}`.substring(5),
  });
  sortBy();
}

const title = h('h1', 'Top 10 movies');
const op = h('div.op', {}, [
  h('span', 'sortBy：'),
  h(
    'span',
    {
      on: {
        click: () => sortBy('id'),
      },
    },
    'Rank',
  ),
  h(
    'span',
    {
      on: {
        click: () => sortBy('title'),
      },
    },
    'Title',
  ),
  h(
    'span',
    {
      on: {
        click: () => sortBy('desc'),
      },
    },
    'Description',
  ),
  h(
    'span',
    {
      on: {
        click: addItem,
      },
    },
    'Add',
  ),
]);
// 第一次渲染
sortBy('id');
