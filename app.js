const app = new Vue({
    el: '#app',
    data: {
        posts: [],
        users: [],
        baseUrl: 'https://jsonplaceholder.typicode.com/',
        page: 1,
        perPage: 10,
        pages: [],
        errored: false,
        loading: true,
    },
    methods: {
        getPosts() {
            axios.get(this.baseUrl + 'posts')
                .then(response => {
                    this.posts = response.data;
                })
                .catch(response => {
                    console.log(error);
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        getUsers() {
            axios.get(this.baseUrl + 'users')
                .then(response => {
                    this.users = response.data.map(el => el.name);


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

        // Zmienić tutaj bo już nie ma więcej niż 100 postów
        readMore(post) {
            let number = ""
            let string = post.id.toString();
            if (post.id >= 100) {
                number = string.charAt(2)
            } else {
                number = string.charAt(1)
            }

            let id = ""
            if (post.id <= 10) {
                id = post.id - 1
            } else {
                if (number == 0) {
                    id = 9
                } else {
                    id = number - 1
                }
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
        this.getUsers();
        this.shortTitle()

    },
    watch: {
        posts() {
            this.setPages();
        }
    },
    computed: {
        displayedPosts() {
            // dodawanie klasy aktywnej - ogarnąć bo nie działa dobrze 
            let pages = document.querySelectorAll('.pagination > button')
            pages.forEach(el => el.classList.remove('active'))
            if (this.page == 1) {
                pages[1].classList.add('active')
            } else {
                pages[1].classList.add('active')
            }
            // koniec 
            return this.paginate(this.posts);
        }
    },
});