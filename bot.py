import telebot

API_TOKEN = '8140239961:AAG00jz9mBFsdr_eykcVfZIYSaw0iB94Sc4'
bot = telebot.TeleBot(API_TOKEN)

TARGET_PHONE = '972532490351@c.us'  # המספר שאליו תישלח ההודעה בוואטסאפ

@bot.message_handler(func=lambda m: True)
def handle_message(message):
    text = message.text

    with open('message_to_send.txt', 'w', encoding='utf-8') as f:
        f.write(f"{TARGET_PHONE}|{text}")

    bot.send_message(message.chat.id, "✅ ההודעה התקבלה ותישלח מיד לוואטסאפ.")

bot.infinity_polling()