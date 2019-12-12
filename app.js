const app = new Vue({
    el: '#app',
    data: {
        posts: [],
        baseUrl: 'https://jsonplaceholder.typicode.com/',
        page: 1,
        perPage: 10,
        pages: [],
        errored: false,
        loading: true,
    },
    methods: {
        getPosts() {
            axios.get(this.baseUrl + 'comments')
                .then(response => {
                    this.posts = response.data;
                })
                .catch(response => {
                    console.log(error);
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        shortTitle() {
            let name = this.posts.slice(1, 10)
            return name

        },
        setPages() {
            let numberOfPages = Math.ceil(this.posts.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate(posts) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return posts.slice(from, to);
        },

        readMore(post) {
            let id = ""
            if (post.id <= 10) {
                id = post.id - 1
            } else if (post.id > 10 && post.id <= 20) {
                id = post.id - 11
            } else if (post.id > 20 && post.id <= 30) {
                id = post.id - 21
            } else if (post.id > 30 && post.id <= 40) {
                id = post.id - 31
            } else if (post.id > 40 && post.id <= 50) {
                id = post.id - 41
            } else if (post.id > 50 && post.id <= 60) {
                id = post.id - 50
            }

            let text = document.querySelectorAll(".short-content")[id];
            let seeMore = document.querySelectorAll(".seeMore")[id];


            if (text.classList.contains('open')) {
                text.textContent = post.body.slice(0, 30)
                text.classList.remove('open')
                seeMore.textContent = "Zobacz więcej..."

            } else {
                text.classList.add("open");
                text.textContent = post.body
                seeMore.textContent = "Zobacz mniej..."

            }
        },
        deletePost(post) {
            alert(`UWAGA!  Post ${post.name} zostaje usunięty!`)
            fetch(`https://jsonplaceholder.typicode.com/comments/${post.id}`, {
                method: 'DELETE'
            })

        }
    },
    created() {
        this.getPosts();
        this.shortTitle()
    },
    watch: {
        posts() {
            this.setPages();
        }
    },
    computed: {
        displayedPosts() {
            return this.paginate(this.posts);
        }
    },
});