import { Priority, Status, type Todo } from "./todoServices";

// API Query Interface 
export type TodoQueryParams= {
    title?: string;
    description?: string;
    search?: string;

    // Status & User Filter
    status?: Status;
    userId?: string;

    // Date yyyy-mm-dd
    createdAt?: string;
    expiresAt?: string;

    //Prioroty
    priority?: Priority;

    // Sort
    sortBy?: 'title' | 'createdAt' | 'status' | 'expiresAt';
    sortOrder?: 'asc' | 'desc';
}

// Query Builder
export class TodoFilterService {
    // Query string from parameter
    static buildQueryString(params: TodoQueryParams): string {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                searchParams.append(key, value.toString());
            }
        });

        return searchParams.toString();
    }

    // Get filtered todos from API
    static async fetchFilteredTodos(filters: TodoQueryParams = {}): Promise<Todo[]> {
        try {
            const queryString = this.buildQueryString(filters);
            const url = `http://localhost:3001/api/todos${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url, {
                credentials: 'include' // Include cookies for session
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            // Backend sendet { success: true, data: [...], count: n }
            return result.data || [];
        } catch (error) {
            console.error('Error fetching filtered todos:', error);
            throw error;
        }
    }

    static getPresetFilters() {
        return {
            // Expires today
            today: (): TodoQueryParams => ({
                expiresAt: new Date().toISOString().split('T')[0], 
                sortBy: 'expiresAt',
                sortOrder: 'asc'
            }),

            // New Todos
            newTodos: (): TodoQueryParams => ({
                status: Status.NEW,
                sortBy: 'createdAt',
                sortOrder: 'desc'
            }),

            // Open todos
            openTodos: (): TodoQueryParams => ({
                status: Status.OPEN,
                sortBy: 'createdAt',
                sortOrder: 'desc'
            }),

            // Finished todos
            completedTodos: (): TodoQueryParams => ({
                status: Status.COMPLETED,
                sortBy: 'createdAt',
                sortOrder: 'desc'
            }),

           
        };
    }
}

// URL Parameter Hooks für React Components
export const useQueryParams = () => {
    const getQueryParams = (): TodoQueryParams => {
        const urlParams = new URLSearchParams(window.location.search);
        const params: TodoQueryParams = {};

        // Alle möglichen Parameter durchgehen
        const paramKeys: (keyof TodoQueryParams)[] = [
            'title', 'description', 'search', 'status', 'userId',
            'createdAt', 'expiresAt', 'sortBy', 'sortOrder', 'priority'
        ];

        paramKeys.forEach(key => {
            const value = urlParams.get(key);
            if (value) {
                (params as any)[key] = value;
            }
        });

        return params;
    };

    const setQueryParams = (params: TodoQueryParams) => {
        const queryString = TodoFilterService.buildQueryString(params);
        const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}`;
        window.history.pushState({}, '', newUrl);
    };

    return { getQueryParams, setQueryParams };
};

export default TodoFilterService;