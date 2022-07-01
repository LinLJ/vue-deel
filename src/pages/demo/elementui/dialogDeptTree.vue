<template>
  <div>
    <el-input class="q-pb-md" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      node-key="id"
      :highlight-current="true"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    ></el-tree>
    <div class="dialog-footer">
      <el-button type="primary" @click="chooseDept()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { getTree } from '@/api/coverge/organization-manage';
import { createTreeByCollection } from '@tdp/util';

export default {
  data() {
    return {
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      currentNode: {}
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getTree().then((v) => {
        this.treeData = createTreeByCollection(v.data, true);
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    handleNodeClick(data, node) {
      this.currentNode = node;
    },
    chooseDept() {
      const node = this.currentNode;
      if (node) {
        if (node.level === 3) {
          this.$emit('selectDetp', node.data.id, node.data.deptName);
        } else {
          this.$notify({
            type: 'info',
            message: '请选择二级节点'
          });
        }
      } else {
        this.$notify({
          type: 'info',
          message: '请选择节点'
        });
      }
    }
  }
};
</script>

<style></style>
