# Trash Mail Detector
Original Idea from [DevStorageEU](https://github.com/DevStorageEU/Trashmail-Detector)

The Trash Mail Detector API is a RESTful API that allows you to detect throwaway email addresses.

The database now contains roughly 140,000 domains and is automatically updated every day.

This makes it easy to find email addresses that are unlikely to be legitimate, like spammer or phisher accounts.

---

### What can the API be used for?

5-minute emails, commonly referred to as trash emails, are frequently utilised to safeguard user privacy and data security.
In order to prevent users from registering with such emails, it is necessary to take preventive measures.

## How to use?

---

### Domain:

**GET:** https://trashmaildetector.example.com/check?validate=trashmail.com
```bash
{
  "processing ": "0ms",
  "provided": "domain",
  "domain": "trashmail.com",
  "status": "suspicious"
}
```
---
### Email:

**GET:** https://trashmaildetector.example.com/check?validate=joe@trashmail.com
```bash
{
  "processing ": "0ms",
  "provided": "email",
  "domain": "trashmail.com",
  "status": "suspicious"
}
```

--- 

The status if the domain/email is suspicious can be seen via the key 'status'.

**Suspicious**: ``"status": "suspicious"``

**Unsuspicious**: ``"status": "unsuspicious"``

---

## Config

The ``config.json`` is used to define the sources for domain blacklists. The configs are loaded after each restart of the software.
