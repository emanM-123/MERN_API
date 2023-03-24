import { Store } from 'laco';

export const TaskStore = new Store(
    {
        listData: { data: [], hasMore: true },
        paginationProps: { count: 0, type: 4, rowsPerPage: 20, page: 0 },
        isOpenDialog: false,
        showDetails: false,
        selectedEditObj: {
            title: '',
            description: '',
            dueDate: ''
        },
    },
    'TaskStore'
);