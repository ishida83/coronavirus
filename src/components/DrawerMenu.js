import React from 'react';
import { FontIcon } from 'react-md';

export default [{
  key: 'inbox',
  primaryText: '明星脸识别',
  leftIcon: <FontIcon>inbox</FontIcon>,
  active: true,
}, {
  key: 'starred',
  primaryText: '明星大撞脸',
  leftIcon: <FontIcon>star</FontIcon>,
}, {
  key: 'send-mail',
  primaryText: '星志君的时光小屋',
  leftIcon: <FontIcon>send</FontIcon>,
}, {
  key: 'drafts',
  primaryText: '关于我们',
  leftIcon: <FontIcon>drafts</FontIcon>,
}
// , { key: 'divider', divider: true }, {
//   key: 'all-mail',
//   primaryText: 'All mail',
//   leftIcon: <FontIcon>mail</FontIcon>,
// }, {
//   key: 'trash',
//   primaryText: 'Trash',
//   leftIcon: <FontIcon>delete</FontIcon>,
// }, {
//   key: 'spam',
//   primaryText: 'Spam',
//   leftIcon: <FontIcon>info</FontIcon>,
// }
];
