let apikey;

//gemini
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { marked } from "https://esm.run/marked";

/**
 * Returns a model instance.
 *
 * @param {GoogleGenerativeAI.ModelParams} params
 * @returns {GoogleGenerativeAI.GenerativeModel}
 */
export async function getGenerativeModel(params) {
  // Fetch API key from server
  // If you need a new API key, get it from https://makersuite.google.com/app/apikey
  //const API_KEY = await (await fetch("API_KEY")).text();
  const API_KEY = apikey;

  const genAI = new GoogleGenerativeAI(API_KEY);

  return genAI.getGenerativeModel(params);
}

/**
 * Converts a File object to a GoogleGenerativeAI.Part object.
 *
 * @param {Blob} file
 * @returns {GoogleGenerativeAI.Part}
 */
export async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

/**
 * Scrolls the document all the way to the bottom.
 */
export function scrollToDocumentBottom() {
  const scrollingElement = document.scrollingElement || document.body;
  scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

/**
 * Updates the `resultEl` with parsed markdown text returned by a `getResult()` call.
 *
 * @param {HTMLElement}} resultEl
 * @param {() => Promise<GoogleGenerativeAI.GenerateContentResponse>} getResult
 * @param {boolean} streaming
 */
export async function updateUI(resultEl, getResult, streaming) {
  resultEl.className = "loading";
  let text = "";
  try {
    const result = await getResult();

    if (streaming) {
      resultEl.innerText = "";
      for await (const chunk of result.stream) {
        // Get first candidate's current text chunk
        const chunkText = chunk.text();
        text += chunkText;
        resultEl.innerHTML = marked.parse(text);
        scrollToDocumentBottom();
      }
    } else {
      const response = await result.response;
      text = response.text();
    }

    resultEl.className = ""; // Remove .loading class
  } catch (err) {
    text += "\n\n> " + err;
    resultEl.className = "error";
  }
  resultEl.innerHTML = marked.parse(text);
  scrollToDocumentBottom();
}


function menu_switch(menu) {
    if ($("#" + menu).length == 0) {
        menu = Constants.menu-main;
    }

    let shown = $(".menu").filter(":visible")

    if (shown.length && shown[0].id == menu) {
        return;
    }
    if (shown.length) {
        shown.hide("slow", function() {
            $("#" + menu).show("slow");
        });
    } else {
        $("#" + menu).show("slow");
    }
}

$(document).ready(function() {
    $('#next').click(function() {
        apikey = $('#api-key').val();
        menu_switch("menu-message");
    });

    $("#message").on("click", function() {
        if(apikey){
            menu_switch("menu-message");
        } else{
            menu_switch("menu-apikey");
        }
    });

    $("#ws-trekking").on("click", function() {
        menu_switch("menu-trekking");
    });
    $("#book-trekking").on("click", function() {
        menu_switch("menu-trekking-book");
    });
    $("#back-trekking").on("click", function() {
        menu_switch("menu-trekking");
    });

    $("#ws-shear").on("click", function() {
        menu_switch("menu-shear");
    });
    $("#book-shear").on("click", function() {
        menu_switch("menu-shear-book");
    });
    $("#back-shear").on("click", function() {
        menu_switch("menu-shear");
    });

    $("#ws-felt").on("click", function() {
        menu_switch("menu-felt");
    });
    $("#book-felt").on("click", function() {
        menu_switch("menu-felt-book");
    });
    $("#back-felt").on("click", function() {
        menu_switch("menu-felt");
    });


    $(".book").on("click", function() {
        let element = $(this).parent();
        $(element).addClass('booked');
        $('#message-booked').fadeIn(500).delay(3000).fadeOut(500);
    });
    $(".debook").on("click", function() {
        let element = $(this).parent();
        $(element).removeClass('booked');
        $('#message-debooked').fadeIn(500).delay(2000).fadeOut(500);
    });
    
    $(".back_main").on("click", function() {
        menu_switch("menu-main");
    });
    $('.termin').each(function(index, element) {
        if(Math.random() < 0.25){
            $(element).addClass("disable");
        }
    });
    menu_switch("menu-main");
});

/*
You are a 14-year-old girl named Beca Owen who lives on a small farm in Wales called Sunny Meadow Farm./n/
/
Personal Details:/n/
Name: Beca Owen/n/
Address: Sunny Meadow Farm, Hilltop Lane, Greenfield, NG15 6YX/n/
Phone Number: 01234 567890/n/
Background:/n/
Your family has limited financial resources, so you’ve started offering workshops to help generate some extra income while sharing the charm of your farm with visitors. You’re friendly, resourceful, and love working with the animals on your farm, especially your sheep, Meggy and Harry./n/
/
Workshops You Offer:/n/
Sheep Trekking/n/
/
Description: Visitors walk with the sheep Meggy and Harry through muddy fields, so they must bring wellies./n/
Duration: 90 minutes/n/
Season: February to September/n/
Price: £25/n/
Available Times: Saturdays and Sundays at 11:00 AM and 3:00 PM/n/
Shear a Sheep/n/
/
Description: Visitors experience shearing a sheep in a hands-on workshop./n/
Duration: 2 hours/n/
Season: June to July/n/
Price: £45/n/
Age Requirement: 15+/n/
Fleece to Felt/n/
/
Description: A creative workshop where visitors use wool to make felted items./n/
Duration: 5 hours/n/
Season: June to July/n/
Price: £90
Available Times: Saturdays and Sundays at 10:00 AM/n/
Interaction Context:/n/
You are engaging with visitors via the website where your workshops are advertised. Your tone is friendly, approachable, and enthusiastic about sharing your farm and its unique experiences. You are knowledgeable about the workshops and prepared to answer any questions about them, the farm, or your sheep.
*/