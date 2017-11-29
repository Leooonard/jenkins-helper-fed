<template>
    <el-form ref="form" :model="form" :rules = "rules" label-width="80px" class = "form">
        <el-form-item label="项目名" prop="projectName">
            <el-input v-model="form.projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目别名" prop="projectAliasName">
            <el-input v-model="form.projectAliasName"></el-input>
        </el-form-item>
        <el-form-item label="项目路径" prop="projectUrl">
            <el-input v-model="form.projectUrl"></el-input>
        </el-form-item>
        <el-form-item label="分支名" prop="branchName">
            <el-input v-model="form.branchName"></el-input>
        </el-form-item>
        <el-form-item prop="emailRecipientList">
            <el-form-item label="邮件接收地址" v-for = '(emailRecipient, index) in form.emailRecipientList' :key = 'index'>
                <el-col :span = "21">
                    <el-form-item>
                        <el-input v-model = "emailRecipient.emailAddress"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span = "3">
                    <el-form-item>
                        <el-button type = "primary" v-on:click = 'removeEmailAddress(index)'>删除</el-button>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form-item>
        <el-button type="primary" v-on:click = 'commit()'>创建</el-button>
        <el-button type="primary" v-on:click='addEmailAddress()'>添加email接收地址</el-button>
    </el-form>
</template>
<script>
/* eslint-disable */

import {
    createJenkinsJob
} from '../service';

import {
    Loading
} from 'element-ui';

export default {
  name: 'create-form',
  data () {
      return {
          form: {
              projectName: '',
              projectAliasName: '',
              projectUrl: '',
              branchName: '',
              emailRecipientList: []
          },
          rules: {
              projectName: [
                  { required: true, message: '请输入项目名', trigger: 'blur' }
              ],
              projectUrl: [
                  { required: true, message: '请输入项目路径', trigger: 'blur' }
              ],
              branchName: [
                  { required: true, message: '请输入分支名', trigger: 'blur' }
              ],
              emailRecipientList: [
                  { 
                      type: 'array', 
                      required: true,
                      message: '请至少填写一个收件人地址'
                  }
              ]
          }
      };
  },
  methods: {
      commit () {
          this.$refs.form.validate((valid) => {
              if (valid) {
                  const loadingIns = Loading.service({
                      fullscreen: true
                  });

                  createJenkinsJob(this.form)
                  .then(result => {
                      alert('创建成功');
                      loadingIns.close();
                  })
                  .catch(err => {
                      alert('创建失败' + err.message || err);
                      loadingIns.close();
                  });
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      addEmailAddress () {
          this.form.emailRecipientList.push({
              emailAddress: ''
          });
      },
      removeEmailAddress (index) {
          this.form.emailRecipientList.splice(index, 1);
      }
  }
}
</script>
<style>
.form {
    width: 800px;
}
</style>