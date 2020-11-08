import polyglotI18nProvider from "ra-i18n-polyglot";
import chineseMessages from "ra-language-chinese";
import chineseTWMessages from "ra-language-chinese-traditional";
import japaneseMessages from "@bicstone/ra-language-japanese";
import englishMessages from "./en";
import { resolveBrowserLocale } from "react-admin";

const messages = {
  "zh-tw": {
		...{
			resources: {
        posts: {
          name: "文章 |||| 文章",
          fields: {
            title: "標題",
            userId: "用戶",
            published_at: "創立日期",
            average_note: "備註",
            views: "訪問次數",
          },
        },
				users: {
					name: '用戶 |||| 用戶',
					fields: {
						name: '姓名',
						username: '用戶名',
						email: '電子郵件',
						address: {
							street: '住處'
						},
						phone: '手電',
						website: '網址',
						company: {
							name: '公司名'
						}
					}
				},
				cities: {
					name: 'Vlog |||| 視訊'
				}
      },
			csv: {
        main: {
          import: "上載",
        },
      },
		},
		...chineseTWMessages,
	},
  zh: {
    ...{
      resources: {
        posts: {
          name: "帖子 |||| 帖子",
          fields: {
            title: "标题",
            userId: "用户",
            published_at: "创建日期",
            average_note: "备注",
            views: "阅读量",
          },
        },
				users: {
					name: '用户 |||| 用户',
					fields: {
						name: '姓名',
						username: '用户名',
						email: '邮件',
						address: {
							street: '住址'
						},
						phone: '联系电话',
						website: '网站',
						company: {
							name: '公司名称'
						}
					}
				},
				cities: {
					name: 'Vlog |||| 视频'
				}
      },
			ra: {
				action: {
					unselect: '反选'
				},
			},
      csv: {
        main: {
          import: "上传导入",
        },
        dialog: {
          extension: "",
        },
      },
    },
    ...chineseMessages,
  },
  ja: {
		...{
			resources: {
        posts: {
          name: "投稿 |||| 投稿",
          fields: {
            title: "タイトル",
            userId: "ユーザー",
            published_at: "公開日",
            average_note: "備考",
            views: "ページビュー",
          },
        },
				users: {
					name: 'ユーザー |||| ユーザー',
					fields: {
						name: '名前',
						username: 'ユーザー名',
						email: '電子メイル',
						address: {
							street: '住所'
						},
						phone: '電話',
						website: 'ウェブサイト',
						company: {
							name: '会社名'
						}
					}
				},
				cities: {
					name: 'Vlog |||| Vlog'
				}
      },
			csv: {
        main: {
          import: "インポート",
        },
      },
		},
		...japaneseMessages,
	},
  en: englishMessages,
};

// const i18nProvider = {
//     translate: (key, options) => 'string',
//     changeLocale: locale => Promise,
//     getLocale: () => 'string',
// }

const i18nProvider = polyglotI18nProvider(
  (locale) => (messages[locale] ? messages[locale] : messages.en),
  resolveBrowserLocale()
);

export default i18nProvider;
