<template>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="创建job" name="first">
            <CreateForm></CreateForm>
        </el-tab-pane>
        <el-tab-pane label="修改job信息" name="second">
            <modify-form></modify-form>
        </el-tab-pane>
        <el-tab-pane label="读取job信息" name="third">
            <read-form></read-form>
        </el-tab-pane>
        <el-tab-pane label="删除job" name="fourth">
            <delete-form></delete-form>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import CreateForm from './CreateForm';
import ModifyForm from './ModifyForm';
import ReadForm from './ReadForm';
import DeleteForm from './DeleteForm';

export default {
  data() {
    return {
      activeName2: 'first',
    };
  },
  components: {
      CreateForm,
      ModifyForm,
      ReadForm,
      DeleteForm
  },
  methods: {
    handleClick(tab, event) {
      // eslint-disable-next-line
      console.log(tab, event);
    },
  },
};
</script>