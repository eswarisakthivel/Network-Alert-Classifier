# 🛡️ Digital Logic Based Network Alert Classifier

**Course:** EC2201 - Digital Logic Fundamentals  
**Author:** Shanmuga Eswari Sakthivel  
**Department/Year:** ADS, 2nd Year (Sec B)  
**Domain:** Cyber Security & Hardware Pre-Filtering  

---

### 📌 Project Overview
Modern enterprise networks process massive traffic volumes where traditional software-based intrusion detection systems (IDS) create processing bottlenecks. This project presents a **Hardware Line-Rate Network Alert Classifier** that uses hardwired 4-variable Boolean logic to perform sub-microsecond pre-filtering of incoming traffic.

By evaluating four binary network conditions, the system triages traffic into three real-time alert states: **Normal**, **Suspicious**, or **Critical Alert**.

---

### 📡 System Inputs & Boolean Variables
The classifier evaluates a 4-tuple binary input vector $X = (A, B, C, D)$:

| Variable | Signal Name | Condition Description |
| :---: | :--- | :--- |
| **A** | High Traffic Volumetry | Inbound packet rate exceeds threshold ($> 10^4 \text{ req/sec}$) |
| **B** | Repeated Auth Failures | Failed login attempts exceed threshold ($> 5 \text{ in 10s}$) |
| **C** | Unauthorized Port Scan | Sequential closed port probing detected |
| **D** | Anomalous Payload / Unknown IP | Signature match on exploit payload or untrusted subnet |

---

### 🧮 Boolean Logic & K-Map Minimization
Using 4-variable Karnaugh Maps (K-Maps), the original canonical expressions were reduced to minimize physical hardware gate counts by **66.7%**:

1. **Critical Alert Output ($F_{\text{crit}}$)**
   - Canonical Minterms: $\sum m(3, 6, 7, 11, 13, 14, 15)$
   - Minimized Sum-of-Products (SOP):
     $$F_{\text{crit}} = (B \cdot C) + (C \cdot D) + (A \cdot B \cdot D)$$

2. **Normal State Output ($F_{\text{norm}}$)**
   - Canonical Minterm: $m_0$ ($\bar{A}\bar{B}\bar{C}\bar{D}$)
   - De Morgan NOR Realization:
     $$F_{\text{norm}} = \overline{A + B + C + D}$$

---

### 🚀 Key Features
- **Interactive Switchboard Console:** Live control of binary signals ($A, B, C, D$) with instantaneous logic evaluation.
- **Dynamic SVG Circuit Visualizer:** Real-time logic gate schematic paths lighting up based on signal activation.
- **Synthetic Log Ingestion:** Live streaming packet log generator simulating real network telemetry.
- **Analytics Dashboard:** Visual comparison of hardware vs. software classification latency.

---

### 🛠️ How to Run Locally
1. Clone or Download Repository:
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/<your-repo-name>.git
