<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form">
            <el-form-item label="项目名" prop="projectName">
                <el-col :span="21">
                    <el-form-item>
                        <el-input v-model="form.projectName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item>
                        <el-button type="primary" v-on:click='deleteProjectInfo()'>删除</el-button>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/* eslint-disable */

import {
    removeJenkinsJob
} from '../service';

import {
    Loading
} from 'element-ui';

export default {
    name: 'delete-form',
    data() {
        return {
            form: {
                projectName: ''
            },
            rules: {
                projectName: [
                    { required: true, message: '请输入项目名', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        deleteProjectInfo () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const loadingIns = Loading.service({
                        fullscreen: true
                    });

                    removeJenkinsJob(this.form.projectName)
                        .then(result => {
                            alert('删除成功');
                            this.form.projectName = '';
                            loadingIns.close();
                        })
                        .catch(e => {
                            alert(e.message);
                            loadingIns.close();
                        });
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style>
.form {
    width: 800px;
}
</style>