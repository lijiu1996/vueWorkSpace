<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行树状列表过滤"
      style="margin-bottom: 30px"
    />

    <el-tree
      ref="subjectTree"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import subject from "@/api/edu/subject";
export default {
  data() {
    return {
      filterText: "",
      subjectList: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.subjectTree.filter(val);
    },
  },

  created() {
    this.fetchNodeList();
  },

  methods: {
    fetchNodeList() {
      subject.getSubjectsList().then((response) => {
        this.subjectList = response.data;
        
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
  },
};
</script>
