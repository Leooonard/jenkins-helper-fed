import {
    get,
    post
} from '../model';

import {
    DEV_SERVICE_URL
} from '../config';

function getUrl (path) {
    return `${DEV_SERVICE_URL}/${path}`;
}

function readJenkinsJobInfo (jobName) {
    return get(getUrl('readJenkinsJob'), {
        jobName
    });
}

function createJenkinsJob (jenkinsJobInfo) {
    return post(getUrl('createJenkinsJob'), {
        'job-name': jenkinsJobInfo.projectName,
        'gerrit-project-url': jenkinsJobInfo.projectUrl,
        'gerrit-branch-name': jenkinsJobInfo.branchName,
        'email-recipient-list': jenkinsJobInfo.emailRecipientList.map(emailRecipient => emailRecipient.emailAddress)
    });
}

function updateJenkinsJob (jenkinsJobInfo) {
    return post(getUrl('updateJenkinsJob'), {
        'job-name': jenkinsJobInfo.projectName,
        'gerrit-project-url': jenkinsJobInfo.projectUrl,
        'gerrit-branch-name': jenkinsJobInfo.branchName,
        'email-recipient-list': jenkinsJobInfo.emailRecipientList.map(emailRecipient => emailRecipient.emailAddress)
    });
}

function removeJenkinsJob (jobName) {
    return post(getUrl('removeJenkinsJob'), {
        'job-name': jobName
    });
}

export {
    readJenkinsJobInfo,
    createJenkinsJob,
    updateJenkinsJob,
    removeJenkinsJob
};
