# 🇮🇳 IndiaPincodeFinder

**Pending Tasks**
1) Writing Development Docs/Guide
2) Pushing to PIP
3) Language Specefic Development

**IndiaPincodeFinder** is a Python module that helps you **find detailed Indian address information by using a valid 6-digit PIN code**. It's ideal for use in logistics, address validation, fintech onboarding (KYC), e-commerce, and mapping services.

---

## 📦 Features

- 🔎 Lookup addresses by PIN code (Postal Index Number)
- 🧾 Returns location metadata: state, district, taluka.
- ⚡ Fast lookup with offline JSON dataset (no API call needed)
- 🧩 Plug-and-play for Python apps, backend services, or CLI tools

---

## 🚀 Installation

Install via `pip`:

```bash
pip install indiapincodefinder
```

## 📖 Usage

```python
import indiapincodefinder

# Get address by Pincode
address = indiapincodefinder.pin_to_address(pincode=400001)

# Get state by Pincode
state = indiapincodefinder.pin_to_state(pincode=400001)

# Get district by Pincode
district = indiapincodefinder.pin_to_district(pincode=400001)

# Get taluka by Pincode
taluka = indiapincodefinder.pin_to_taluka(pincode=400001)

```

## 📄 License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Copyright

[@IntegerAlex](https://github.com/IntegerAlex)
[@AniketDhumal](https://github.com/AniketDhumal)
[@Agribid](https://github.com/Agribid)

## 📄 Disclaimer

This project is for educational purposes only. The data is sourced from public databases.

## 📄 Contact

For any questions or feedback, please contact [@IntegerAlex](https://github.com/IntegerAlex) or [@AniketDhumal](https://github.com/AniketDhumal).