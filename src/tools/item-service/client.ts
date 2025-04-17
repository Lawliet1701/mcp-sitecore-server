class SitecoreRestfulItemServiceClient {
    private serverUrl: string;
    private username: string;
    private password: string;
    private domain: string;
    private authCookie: string | null = null;
    private isInitialized: boolean = false;

    constructor(serverUrl: string, username: string, password: string, domain: string = 'sitecore') {
        this.serverUrl = serverUrl;
        this.username = username;
        this.password = password;
        this.domain = domain;
    }

    /**
     * Initializes the client by logging in and setting the authentication cookie.
     * @returns {Promise<void>} - Resolves if initialization is successful.
     */
    async initialize(): Promise<void> {
        if (!this.isInitialized) {
            try {
                await this.login();
                this.isInitialized = true;
            } catch (error) {
                console.error('Failed to initialize client:', error);
                throw error;
            }
        }
    }

    /**
     * Logs in to the Sitecore server and sets the authentication cookie.
     * @returns {Promise<void>} - Resolves if login is successful.
     */
    async login(): Promise<void> {
        const url = `${this.serverUrl}/sitecore/api/ssc/auth/login`;

        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                    domain: this.domain
                })
            });


            if (!response.ok) {
                throw new Error('Login failed');
            }

            const cookies = response.headers.get('set-cookie');
            if (cookies) {
                const match = cookies.match(/\.AspNet\.Cookies=([^;]+);/);
                if (match) {
                    this.authCookie = match[1];
                }
            }
            else {
                throw new Error('No cookies received in response headers');
            }

            if (!this.authCookie) {
                throw new Error('Failed to retrieve authentication cookie');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to log in: ${error.message}`);
            } else {
                throw new Error('Failed to log in: An unknown error occurred');
            }
        }
    }

    /**
     * Retrieves a Sitecore item by its ID using the ItemService RESTful API.
     * @param {string} id - The GUID of the Sitecore item to retrieve.
     * @param {Object} [options] - Optional parameters for the request.
     * @returns {Promise<Object>} - The retrieved Sitecore item.
     */
    async getItemById(id: string, options: {
        database?: string;
        language?: string;
        version?: string;
        includeStandardTemplateFields?: boolean;
        includeMetadata?: boolean;
        fields?: string[];
    } = {}): Promise<Object> {

        if (!this.isInitialized) {
            await this.initialize();
        }

        const params = new URLSearchParams(options as Record<string, string>);

        if (options.fields) {
            params.set('fields', options.fields.join(','));
        }

        const url = `${this.serverUrl}/sitecore/api/ssc/item/${id}?${params.toString()}`;

        try {
            const response = await fetch(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as unknown as Object;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve item by ID: ${error.message}`);
            } else {
                throw new Error('Failed to retrieve item by ID: An unknown error occurred');
            }
        }
    }

    /**
     * Retrieves the children of a Sitecore item by its ID using the ItemService RESTful API.
     * @param {string} id - The GUID of the Sitecore item whose children to retrieve.
     * @param {Object} [options] - Optional parameters for the request.
     * @returns {Promise<Object>} - The retrieved Sitecore item children.
     */
    async getItemChildren(id: string, options: {
        database?: string;
        language?: string;
        version?: string;
        includeStandardTemplateFields?: boolean;
        includeMetadata?: boolean;
        fields?: string[];
    } = {}): Promise<Object> {

        if (!this.isInitialized) {
            await this.initialize();
        }

        const params = new URLSearchParams(options as Record<string, string>);

        if (options.fields) {
            params.set('fields', options.fields.join(','));
        }

        const url = `${this.serverUrl}/sitecore/api/ssc/item/${id}/children?${params.toString()}`;

        try {
            const response = await fetch(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as unknown as Object;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve item children: ${error.message}`);
            } else {
                throw new Error('Failed to retrieve item children: An unknown error occurred');
            }
        }
    }

    /**
     * Retrieves a Sitecore item by its path using the ItemService RESTful API.
     * @param {string} path - The content path of the Sitecore item to retrieve.
     * @param {Object} [options] - Optional parameters for the request.
     * @returns {Promise<Object>} - The retrieved Sitecore item.
     */
    async getItemByPath(path: string, options: {
        database?: string;
        language?: string;
        version?: string;
        includeStandardTemplateFields?: boolean;
        includeMetadata?: boolean;
        fields?: string[];
    } = {}): Promise<Object> {

        if (!this.isInitialized) {
            await this.initialize();
        }

        // Encode the path parameter to make it URL-safe
        const encodedPath = encodeURIComponent(path);
        const params = new URLSearchParams(options as Record<string, string>);

        if (options.fields) {
            params.set('fields', options.fields.join(','));
        }

        const url = `${this.serverUrl}/sitecore/api/ssc/item?path=${encodedPath}&${params.toString()}`;

        try {
            const response = await fetch(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as unknown as Object;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve item by path: ${error.message}`);
            } else {
                throw new Error('Failed to retrieve item by path: An unknown error occurred');
            }
        }
    }

}

export default SitecoreRestfulItemServiceClient;