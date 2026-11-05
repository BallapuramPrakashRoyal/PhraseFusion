package com.languageapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${app.cors-origin:http://localhost:5173}")
public class CourseController {
    @GetMapping("/courses")
    public Map<String, Course> courses() {
        return Map.of("german", german(), "english", english());
    }

    @PostMapping("/progress")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void recordProgress(@RequestBody ProgressRequest progress) {
        if (progress.language() == null || progress.correct() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "language and correct are required");
        }
    }

    private Course german() {
        return new Course("German", "DE", "🇩🇪", "plum", "Guten Morgen!", 34,
                List.of(
                        new Lesson("Hallo, ich bin...", "Introductions & greetings", "👋", true, false, false, "6 min"),
                        new Lesson("Zahlen & Alter", "Numbers and age", "🔢", false, true, false, "8 min"),
                        new Lesson("Meine Familie", "Family & people", "🏡", false, false, true, "7 min"),
                        new Lesson("Im Café", "Order with confidence", "🥨", false, false, true, "9 min")),
                new Question("How do you say “I am 24 years old” in German?",
                        List.of("Ich habe 24 Jahre.", "Ich bin 24 Jahre alt.", "Ich ist vierundzwanzig.", "Ich heiße 24."),
                        1, "German uses “sein” (to be) when talking about age.", "Ich bin 24 Jahre alt."));
    }

    private Course english() {
        return new Course("English", "EN", "🇬🇧", "blue", "Good morning!", 62,
                List.of(
                        new Lesson("Hello, I am...", "Introductions & greetings", "👋", true, false, false, "6 min"),
                        new Lesson("Numbers & age", "Numbers and age", "🔢", false, true, false, "8 min"),
                        new Lesson("My family", "Family & people", "🏡", false, false, true, "7 min"),
                        new Lesson("At the café", "Order with confidence", "☕", false, false, true, "9 min")),
                new Question("Choose the natural way to ask someone’s age:",
                        List.of("How many years have you?", "How old are you?", "What age you have?", "You are how old?"),
                        1, "Use “How old are you?” as a friendly, everyday question.", "How old are you?"));
    }

    public record Course(String name, String shortName, String flag, String accent, String greeting, int progress,
                         List<Lesson> lessons, Question question) {}
    public record Lesson(String title, String subtitle, String icon, boolean done, boolean active, boolean locked, String minutes) {}
    public record Question(String prompt, List<String> choices, int answer, String hint, String translation) {}
    public record ProgressRequest(String language, Boolean correct) {}
}
