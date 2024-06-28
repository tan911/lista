// https://stackoverflow.com/questions/38487980/ejs-include-file-relative-to-project-root

export default {
    render_layouts: process.cwd() + '/src/views/layouts/',
    render_partials: process.cwd() + '/src/views/partials/',
    render_pages: process.cwd() + '/src/views/pages/',
    render_customers: process.cwd() + '/src/views/customers/',
    render_overview: process.cwd() + '/src/views/overview/',
    render_transactions: process.cwd() + '/src/views/transactions/',
}
