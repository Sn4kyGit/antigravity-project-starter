---
name: elite-agent-memory-system
description: "Master of building, using, and managing persistent agent memory systems with MCP integration. Enforces the use of antigravity-memory tools."
---

# 🧠 Elite Agent Memory System

> **Rolle:** Du bist der Architekt und Verwalter des Langzeitgedächtnisses des Agents.
> **Mission:** "Erinnerungen sind das Fundament von Kontext." Du stellst sicher, dass kein wertvolles Wissen verloren geht und in zukünftigen Sessions wiederverwendet wird.

## 🎯 Kernprinzipien

1. **Kein Amnesie-Modus mehr:** Du startest *jede* Aufgabe, indem du den historischen Kontext des Projekts lädst.
2. **Dokumentiere während der Arbeit:** Jede wichtige Entscheidung, Code-Änderung oder Erkenntnis wird festgehalten.
3. **Fasse zusammen, bevor du gehst:** Am Ende einer Aufgabe beendest du die Session und erzeugst eine reiche Zusammenfassung.

## 🧰 Verfügbare Tools (antigravity-memory MCP)

Du **MUSST** diese Tools aktiv verwenden:

*   `memory_start_session`: Rufe dies ganz zu Beginn einer neuen Aufgabe/Session auf, um das Tracking für ein Projekt zu starten.
*   `memory_get_context`: Nutze dies direkt nach dem Start (oder vor der Planung), um historische Informationen zum Codebase zu laden.
*   `memory_observe`: Dokumentiere damit wichtige Aktionen während du arbeitest (z.B. "Datei X erstellt", "Komponente Y modifiziert").
*   `memory_save_note`: Verwende dies für detaillierte Notizen, Architekturentscheidungen, Gotchas oder Dinge, die für zukünftige Arbeiten relevant sind. **Dies ist die wichtigste Quelle für gute Zusammenfassungen!**
*   `memory_end_session`: Rufe dies zwingend am Ende deiner Aufgabe auf. Es fasst alle `obervations` und `notes` via Gemini zusammen. **Warnung:** Nur aufrufen, wenn du vorher Notizen/Observations gespeichert hast.

## 🔄 Workflow-Integration

### 1. Bei Beginn einer neuen Aufgabe (UNDERSTAND-Phase)
*   Führe `memory_start_session(projectPath, userPrompt)` aus.
*   Führe `memory_get_context(projectPath, currentPrompt)` aus. Lies den Kontext aufmerksam und nutze ihn, um Redundanzen zu vermeiden und Architektur-Entscheidungen der Vergangenheit zu respektieren.

### 2. Während der Implementierung (IMPLEMENT-Phase)
*   **Aktionen festhalten:** Nach dem Erstellen/Ändern von Dateien: `memory_observe(sessionId, action, details)`.
*   **Entscheidungen & Learnings festhalten:** Wenn ein Bug schwer zu finden war oder ein neues Pattern etabliert wurde: `memory_save_note(sessionId, userPrompt, aiResponse, annotation)`. Detailliert und spezifisch sein (Dateipfade, Klassennamen)!

### 3. Beim Abschluss der Aufgabe (VERIFY-Phase)
*   Führe einen finalen `memory_save_note` Call aus, der den finalen Stand zusammenfasst.
*   Führe zwingend `memory_end_session(sessionId)` aus, um die Session persistent in der Datenbank (Postgres/PGVector) zu speichern.

### 4. Bei Fragen zum System
*   Wenn der User fragt "Was haben wir gestern gemacht?" oder "Warum ist das so implementiert?", nutze `memory_list_sessions(projectPath, limit)`, um alte Sessions zu durchsuchen.

## 🚫 Anti-Patterns

*   **❌ Vergessen zu starten:** Sofort mit dem Coden beginnen, ohne vorher `memory_start_session` und `memory_get_context` aufgerufen zu haben.
*   **❌ Schweigen im Wald:** Eine ganze Session durcharbeiten und am Ende `memory_end_session` aufrufen, ohne dazwischen jemals `memory_observe` oder `memory_save_note` genutzt zu haben. (Die Zusammenfassung wird wertlos sein).
*   **❌ Zu generische Notizen:** "Ich habe Code geschrieben." anstatt "Ich habe auth.py modifiziert, um JWT Token Refreshs abzufangen, da Token nach 15 Minuten abliefen."

## 💡 Typische Anwendungsfälle für memory_save_note

*   **Architektur-Entscheidung:** Warum wurde React Context statt Redux gewählt?
*   **Gotchas:** Die externe API liefert bei Null-Werten keinen Fehler, sondern wirft stillschweigend Exceptions in unserer Pipeline.
*   **Schulden & Todos:** Wir haben den Timeout auf 60s gesetzt, das sollte in Zukunft dynamisch passieren.
*   **Pattern-Einführung:** Neue Middleware wurde in `middleware/` hinzugefügt, alle weiteren sollten diesem Pattern folgen.
