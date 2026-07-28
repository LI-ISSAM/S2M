<template>
  <div id="app">
    <app-container />
    <chatbot-widget />
  </div>
</template>

<script>
import AppContainer from "@/components/common/AppContainer";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget.vue";

export default {
  name: "App",
  components: {
    AppContainer,
    ChatbotWidget
  }
}
</script>