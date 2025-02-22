package com.d2i.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping(value = { "/", "/{path:[^\\.]*}" })
    public String forward() {
        return "forward:/index.html";
    }
}
