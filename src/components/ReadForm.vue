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
                    <el-button type="primary" v-on:click='loadProjectInfo()'>读取</el-button>
                </el-form-item>
            </el-col>
        </el-form-item>
    </el-form>
    <el-row v-if = "hasLoadProjectInfo">
        <el-col :span="4">
            <p>gerrit地址：</p>
        </el-col>
        <el-col :span="20">
            <p>{{form.projectUrl}}</p>
        </el-col>
    </el-row>
    <el-row v-if="hasLoadProjectInfo">
        <el-col :span="4">
            <p>gerrit分支名：</p>
        </el-col>
        <el-col :span="20">
            <p>{{form.branchName}}</p>
        </el-col>
    </el-row>
    <el-row v-if="hasLoadProjectInfo">
        <el-col :span="4">
            <p>email收件地址</p>
        </el-col>
        <el-col :span="20">
            <p v-for = 'emailRecipient in form.emailRecipientList'>{{emailRecipient.emailAddress}}</p>
        </el-col>
    </el-row>

</div>
</template>
<script>
/* eslint-disable */

import {
    readJenkinsJobInfo
} from '../service';

import {
    Loading
} from 'element-ui';

export default {
    name: 'read-form',
    data() {
        return {
            hasLoadProjectInfo: false,
            form: {
                projectName: '',
                projectUrl: '',
                branchName: '',
                emailRecipientList: []
            },
            rules: {
                projectName: [
                    { required: true, message: '请输入项目名', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        loadProjectInfo() {
            if (this.form.projectName === '') {
                this.$refs.form.validate();
                return;
            }

            const loadingIns = Loading.service({
                fullscreen: true
            });

            readJenkinsJobInfo(this.form.projectName)
            .then(result => {
                this.form.projectUrl = result.data.projectUrl;
                this.form.branchName = result.data.projectBranch;
                this.form.emailRecipientList = result.data.emailRecipientList.map(emailAddress => ({emailAddress}));
                this.hasLoadProjectInfo = true;
                loadingIns.close();
            })
            .catch(e => {
                alert(e.message);
                loadingIns.close();
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