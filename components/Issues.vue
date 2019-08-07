<script>
import fetch from 'cross-fetch'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  data: () => ({
    issues: [],
    panel: []
  }),
  computed: {
  },
  async mounted () {
    this.issues = await this.requestIssues()
  },
  methods: {
    getIssueIcon (issue) {
      if (issue.pull_request) {
        return '../assets/git-pull-request.svg'
      }

      if (issue.state == 'open') {
        return '../assets/issue-opened.svg'
      }

      if (issue.state == 'closed') {
        return '../assets/issue-closed.svg'
      }

      if (issue.state == 'reopened') {
        return '../assets/issue-reopened.svg'
      }
    },
    async requestIssues () {
      const date = new Date()
      date.setDate(date.getDate() - 7)
      const url = new URL('https://api.github.com/repos/angular/angular/issues')
      url.search = new URLSearchParams({
        since: date.toISOString()
      })

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      })

      if (!response.ok) {
        return response.text().then(text => {
          let error = text
          try {
            error = JSON.parse(text).errors[0].message
          } catch (err) { }
          throw new Error(error)
        })
      }

      return response.json()
    }
  }
}
</script>

<template>
  <VContent class="issues">
    <VProgressCircular
      v-if="issues.length === 0"
      indeterminate
      class="issues__spinner"
      color="primary"
    ></VProgressCircular>

    <VExpansionPanels
      v-else
      v-model="panel"
      multiple
    >
      <VExpansionPanel
        v-for="issue in issues"
        :key="issue.id"
      >
        <VExpansionPanelHeader>
          <VLayout column>
            <VFlex
              class="title"
              mb-2
            >
              <img
                :src="getIssueIcon(issue)"
                class="issues__issue__title-icon"
              >
              <span class="issues__issue__title">
                {{ issue.title }}
              </span>
            </VFlex>
            <VFlex ml-3>
              <VLayout>
                <VFlex
                  row
                  align-center
                >
                  User:
                  <img
                    class="elevation-2 issues__avatar"
                    :src="issue.user.avatar_url"
                  >
                  {{ issue.user.login }}
                </VFlex>
                <VFlex
                  v-if="issue.assignee"
                  row
                  align-center
                  class="issues__issue__assignee"
                >
                  Assignee:
                  <img
                    class="elevation-2 issues__avatar"
                    :src="issue.assignee.avatar_url"
                  >
                  {{ issue.assignee.login }}
                </VFlex>
              </VLayout>
            </VFlex>
          </VLayout>
        </VExpansionPanelHeader>
        <VExpansionPanelContent>
          <VueMarkdown>
            {{ issue.body }}
          </VueMarkdown>
        </VExpansionPanelContent>
      </VExpansionPanel>
    </VExpansionPanels>
  </VContent>
</template>

<style>
  .issues {
    max-width: 90vw;
    margin: 0 auto;
  }

  .issues__avatar {
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
    margin-left: 8px;
  }

  .issues__spinner {
    display: block;
    margin: 64px auto;
  }

  .issues__issue__title-icon {
    margin-right: 8px;
    height: 24px;
    vertical-align: middle;
  }

  .issues__issue__title {
    vertical-align: middle;
  }
</style>
