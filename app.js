const app = new Vue({
    el: '#app',
    data: {
        posts: [],
        baseUrl: 'https://jsonplaceholder.typicode.com/',
        page: 1,
        perPage: 10,
        pages: [],
        isActive: false,
    },
    methods: {
        getPosts() {
            axios.get(this.baseUrl + 'comments')
                .then(response => {
                    this.posts = response.data;
                })
                .catch(response => {
                    console.log(response);
                });
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
            let text = document.querySelectorAll(".post-content")[post.id - 1];

            if (text.classList.contains('open')) {
                text.textContent = post.body.slice(0, 30)
                text.classList.remove('open')

            } else {
                text.classList.add("open");
                text.textContent = post.body
            }

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