# Continuity — Working Memory Protocol

> **Priorität:** 🔴 Kritisch
> **Datei:** `.agent/CONTINUITY.md`

---

## Grundregel

CONTINUITY.md ist das Kurzzeitgedächtnis des Agents. Es wird bei **JEDEM Turn** gelesen und bei **JEDEM Turn** aktualisiert. Ohne CONTINUITY.md verliert der Agent den Überblick — besonders bei komplexen, mehrstufigen Tasks.

> *"Your Agent's Reasoning Is Fine — Its Memory Isn't"*

---

## Session-Start Protokoll

Bei Beginn einer neuen Session (oder eines neuen Tasks):

```
1. CONTINUITY.md lesen → "Wo war ich? Was war der letzte Stand?"
2. `memory_start_session` aufrufen
3. `memory_get_context` mit Hauptthema aufrufen → relevante Long-term Memories laden
4. Aktuellen Task und Status prüfen → weiterarbeiten oder neuen Task starten
```

Falls CONTINUITY.md leer oder veraltet ist (anderer Task):
- Alle Felder zurücksetzen
- Neuen Task eintragen
- Frisch starten

---

## Während der Session

### Nach jedem Gate-Wechsel
```
✅ "Aktives Gate" updaten (1-UNDERSTAND → 2-ANALYZE → 3-PLAN → 4-IMPLEMENT → 5-VERIFY)
✅ "Erledigte Schritte" ergänzen
✅ "Nächste Schritte" aktualisieren
✅ "Betroffene Dateien" Tabelle pflegen
```

### Bei Fehlern
```
✅ Fehler in "⚠️ Mistakes & Learnings" dokumentieren
   Format: "❌ Was passiert ist → 💡 Was gelernt wurde → 🔧 Wie gefixed"
✅ Workaround/Fix beschreiben
✅ Diese Info wird am Session-Ende in `memory_save_note` konsolidiert
```

### Bei offenen Fragen
```
✅ Frage in "Offene Fragen an den User" eintragen
✅ Erst den User fragen bevor weitergemacht wird
```

---

## Session-Ende Protokoll

Bevor die Session endet (User sagt "fertig", Commit, etc.):

```
1. CONTINUITY.md finalisieren → Endstand dokumentieren
2. "Mistakes & Learnings" prüfen:
   └── Wichtige Learnings → `memory_save_note` aufrufen
3. Abschließend ZWINGEND `memory_end_session` aufrufen, um die Session zusammenzufassen!
4. "Betroffene Dateien" Tabelle vervollständigen
4. "Nächste Schritte" für die nächste Session hinterlassen
5. Status auf "done" oder "blocked" setzen mit Begründung
```

---

## Memory MCP Bridge

### Session-Start (Memory → CONTINUITY)
```typescript
// Automatisch am Anfang
memory_start_session(...)
const results = memory_get_context(...)
```

### Session-Ende (CONTINUITY → Memory)
```typescript
// Learnings konsolidieren
memory_save_note(...)
// Abschliessen
memory_end_session(...)
```

---

## Anti-Patterns

### ❌ CONTINUITY.md nicht lesen
Symptom: Agent fragt Dinge die bereits geklärt wurden, wiederholt Arbeitsschritte.

### ❌ CONTINUITY.md nicht updaten
Symptom: Bei Session-Wechsel ist der Kontext verloren, Learnings gehen verloren.

### ❌ Zu viel in CONTINUITY.md schreiben
CONTINUITY.md ist Working Memory, nicht Documentation. Kurz und prägnant halten.
Max 50 Zeilen aktiver Content — der Rest geht in Memory MCP.

### ❌ Mistakes nicht dokumentieren
Fehler sind die wertvollste Information. Immer dokumentieren, immer konsolidieren.
