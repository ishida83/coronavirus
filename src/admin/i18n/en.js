
import englishMessages from "ra-language-english";

const englishDomainMessages = {
  ra: {
    notification: {
      http_error: "Network error. Please retry",
    },
    action: {
      save: "Save",
      delete: "Delete",
			create: "Create",
			export: "Export",
			edit: "Edit",
			// bulk_actions: '',
			unselect: 'Unselect',
			sort: 'Sort',
			refresh: 'Refresh',
    },
		page: {
			dashboard: 'Dashboard',
			// list: ''
		},
		navigation: {
			page_rows_per_page: 'Rows per page',
			// page_range_info: '',
			next: 'Next',
			prev: 'Prev',
			no_results: 'No results found'
		},
		// auth: {
		// 	user_menu: '',
		// 	logout: '',
		// }
  },
	csv: {
		main: {
			import: 'Import'
		},
		dialog: {
			extension: ''
		}
	}
};

export default {
	...englishDomainMessages,
	...englishMessages,
};