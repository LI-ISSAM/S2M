<template>
  <div class="chatbot-widget">
    <b-button
      variant="primary"
      class="chatbot-toggle"
      pill
      @click="isOpen = !isOpen"
    >
      <font-awesome-icon :icon="isOpen ? 'xmark' : 'comment-dots'" />
    </b-button>

    <div v-if="isOpen" class="chatbot-panel shadow">
      <div class="chatbot-header">
        <font-awesome-icon icon="robot" class="mr-2" />
        Assistant S2M
      </div>

      <div class="chatbot-messages" ref="messagesContainer">
        <div
          v-if="messages.length === 0"
          class="text-muted small text-center mt-3"
        >
          Pose-moi une question sur l'état du système, demande-moi un résumé, ou
          de l'aide pour rédiger un message client.
        </div>
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          :class="[
            'chatbot-message',
            msg.role === 'user'
              ? 'chatbot-message-user'
              : 'chatbot-message-assistant',
          ]"
        >
          {{ msg.content }}
        </div>
        <div v-if="loading" class="chatbot-message chatbot-message-assistant">
          <b-spinner small /> en train d'écrire...
        </div>
      </div>

      <div class="chatbot-input">
        <b-form-input
          v-model="input"
          placeholder="Écris ton message..."
          @keyup.enter="send"
          :disabled="loading"
        />
        <b-button
          variant="primary"
          @click="send"
          :disabled="loading || !input.trim()"
        >
          <font-awesome-icon icon="paper-plane" />
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import ChatbotService from "@/services/chatbot/ChatbotService";

export default {
  name: "ChatbotWidget",
  data() {
    return {
      isOpen: false,
      input: "",
      loading: false,
      messages: [], // [{role: 'user'|'assistant', content: '...'}]
    };
  },
  methods: {
    send() {
      const text = this.input.trim();
      if (!text || this.loading) return;

      this.messages.push({ role: "user", content: text });
      this.input = "";
      this.loading = true;
      this.scrollToBottom();

      // On envoie l'historique SANS le message qu'on vient d'ajouter (déjà
      // passé séparément en paramètre "message" par ChatbotService.ask()).
      const history = this.messages.slice(0, -1);

      ChatbotService.ask(text, history)
        .then((response) => {
          this.messages.push({
            role: "assistant",
            content: response.data.reply,
          });
        })
        .catch(() => {
          this.messages.push({
            role: "assistant",
            content: "Désolé, une erreur est survenue.",
          });
        })
        .finally(() => {
          this.loading = false;
          this.scrollToBottom();
        });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.messagesContainer;
        if (el) el.scrollTop = el.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.chatbot-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1050;
}
.chatbot-toggle {
  width: 56px;
  height: 56px;
  font-size: 1.3rem;
}
.chatbot-panel {
  position: absolute;
  bottom: 68px;
  right: 0;
  width: 340px;
  height: 460px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chatbot-header {
  background: #17a2b8;
  color: #fff;
  padding: 10px 15px;
  font-weight: bold;
}
.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #f8f9fa;
}
.chatbot-message {
  max-width: 85%;
  padding: 8px 12px;
  border-radius: 12px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  white-space: pre-wrap;
}
.chatbot-message-user {
  background: #17a2b8;
  color: #fff;
  margin-left: auto;
}
.chatbot-message-assistant {
  background: #e9ecef;
  color: #212529;
}
.chatbot-input {
  display: flex;
  gap: 6px;
  padding: 10px;
  border-top: 1px solid #dee2e6;
}
</style>
