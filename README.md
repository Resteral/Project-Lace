# Project Lace — AgentChip Platform

A universal AI agent chip platform that lets any business deploy, configure, and manage AI-powered edge devices.

## What is AgentChip?

AgentChip is a hardware + software platform for deploying small, intelligent AI agents in physical spaces. Think of it as an "AI appliance" — a small chip/device that businesses plug in and configure through a cloud dashboard.

## Features

- **Dashboard** — Real-time overview of all deployed devices, interactions, and health
- **Device Management** — Register, pair, and monitor AI agent devices
- **Agent Configuration** — Set persona, voice, capabilities, and knowledge base per device
- **Live Simulator** — Test your agent configuration with an interactive chat interface
- **Analytics** — Track interactions, top queries, and customer satisfaction

## Use Cases

| Business | Agent Role |
|----------|-----------|
| Retail / Convenience | Customer assistant, price checks, store info |
| Restaurant | Order taking, menu questions |
| Office | Receptionist, visitor check-in |
| Warehouse | Inventory monitoring, anomaly detection |
| Clinic | Patient check-in, appointment reminders |

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Design**: Dark theme, glassmorphism, Inter font, responsive
- **Charts**: Custom Canvas-based charts
- **Agent Engine**: Rule-based response system (ready for OpenAI API integration)

## Getting Started

1. Open `index.html` in a browser
2. Or serve locally:
   ```bash
   npx serve .
   ```

## Roadmap

- [ ] OpenAI API integration for real AI responses
- [ ] Raspberry Pi device runtime agent
- [ ] OTA firmware update system
- [ ] Multi-tenant business dashboard
- [ ] Real hardware PCB design (ESP32-S3 / RPi CM5)
- [ ] FCC/CE certification for production units

## License

MIT
