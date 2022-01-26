<script>
import DatasourceUtils from "./utils/DatasourceUtils";
import eventBus from "@/core/eventbus";

export default {
  name: "Table-Pagination",
  render(h) {
    return (
        <div class="vue-pagination">
          <ul>
            <li className={{disabled: this.currentPage === 1}} on-click={(e) => this.previous(e)}>
              <a href="#" >
                <span aria-hidden="true" class="material-icons">chevron_left</span>
                <span>Geri</span>
              </a>
            </li>
            {this.paginationItems}
            <li className={{disabled: this.currentPage === this.lastPage}} on-click={(e) => this.next(e)}>
              <a href="#" >
                <span>İleri</span>
                <span aria-hidden="true" class="material-icons">chevron_right</span>
              </a>
            </li>
          </ul>
        </div>
    );
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 0,
    },
  },
  created() {
    window.addEventListener("keyup", ({key}) =>
        this.changePageWithKeyBoard(key)
    );
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    items: DatasourceUtils.gettingItems,
    paginationItems() {
      return this.items.map((item, index) => {
        return (
            <li class={{active: this.currentPage === item}}>
              <a href="#" on-click={(e) => this.change(e, item)}>
                {item}
              </a>
            </li>
        );
      });
    },
    lastPage() {
      if (this.total === 0) return 1;
      return parseInt((this.total - 1) / this.perPage + 1);
    },
  },
  methods: {
    firstPage(e) {
      e.preventDefault();
      if (this.currentPage !== 1) {
        this.change(e, 1);
      }
    },
    previous(e) {
      e.preventDefault();
      if (this.currentPage !== 1) {
        let p = --this.currentPage;
        console.log("previous =", p);
        this.change(e, p);
      }
    },
    change(e, page) {
      e.preventDefault();
      this.currentPage = page;
      console.log("page = ", page);
      eventBus.$emit("pagination-change", page);
    },
    next(e) {
      e.preventDefault();
      if (this.currentPage !== this.lastPage) {
        let p = ++this.currentPage;
        console.log("next =", p);
        this.change(e, p);
      }
    },
    goTolastPage(e, page) {
      e.preventDefault();
      if (this.currentPage !== this.lastPage) {
        this.change(e, page);
      }
    },
    changePageWithKeyBoard(key) {
      if (key === "ArrowLeft") {
        this.previous();
      } else if (key === "ArrowRight") {
        this.next();
      }
    },
  },
};
</script>

<style scoped>
.vue-pagination {
  background-color: transparent;
  border-top: 1px solid #19191a;
  padding: 0.75rem;
}

.vue-pagination nav .pagination {
  margin: 10px 0
}

.vue-pagination ul {
  position: relative;
  z-index: 0;
  border-radius: 0.25rem;
  padding-left: 0;
  justify-content: flex-start !important;
  display: flex;
  list-style: none;
  margin: 0px;
}

.vue-pagination ul li {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  background-color: transparent;
  /*border-right: 1px solid #dee2e6;*/
}
.vue-pagination ul li:last-child{
  /*border-right:none;*/
}

.vue-pagination ul li:hover {
  background-color: #17191f;
  border-color: #0d0d0d;
  padding-right: 10px;
  border-radius: 5px;
  padding: 0 0.5rem;
}
.vue-pagination ul li.active {
  background-color: #5567ff;
  border-color: #5567ff;
}

.vue-pagination ul li.disabled:hover {
  padding-right: 10px;
  background-color: unset;
  border-color: unset;
  color: #cfcfcf;
  pointer-events: none;
  padding: 0 0.5rem;
}

vue-pagination ul li.disabled a {
  color: #cfcfcf;
  pointer-events: none;
}

.vue-pagination ul li a {
  display: flex;
  align-items: center;

}

</style>