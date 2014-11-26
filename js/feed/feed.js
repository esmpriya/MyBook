"use strict";

Date.prototype.toString = function() {
    return this.getDate() + "-" + (this.getMonth() + 1) + "-" + this.getFullYear() + " " +
    (this.getHours() < 10 ? "0" + this.getHours() : this.getHours())       + ":" +
    (this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes()) + ":" +
    (this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds()) ;
};

var Feed = function() {
    this.id = 0;
    this.type = "text";
    this.postedOn = new Date();
    this.postedBy = "priya";
};

Feed.prototype = {
    getId: function() { return this.id; },
    getType: function() { return this.type; },
    getPostedOn: function() { return this.postedOn.toString(); },
    isText: function() { return this.type === 'text'; }
};

var URLFeed = function (URL) {
    this.URL = URL;
    this.type = "URL";
    this.id = 0;
    this.postedOn = new Date();
    this.postedBy = "priya";
};

URLFeed.prototype = new Feed();
URLFeed.prototype.getFeed = function() {
    return this.URL;
};

var TextFeed = function (text) {
    this.text = text;
    this.type = "text";
    this.id = 0;
    this.postedOn = new Date();
    this.postedBy = "priya";
};

TextFeed.prototype = new Feed();
TextFeed.prototype.getFeed = function() {
    return this.text;
};


function isUrl(str) {
    var regexp = /(ftp|http|https|file):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(str);
}

var feedService = (function() {

    var feeds = [];
    var id = 0;

    return {
        createFeed: function(feedText) {

            id++;
            var feed = isUrl(feedText) ?  new URLFeed(feedText) : new TextFeed(feedText);
            feed.id = id;
            feeds.push(feed);
            return feed;
        },

        deleteFeed: function(id) {
            for (var i = 0; i < feeds.length; i++) {
                if (feeds[i].id == id) {
                    return feeds.splice(i, 1);
                }
            }
        },

        getTotalFeed: function() {
            return feeds;
        },

        getFeedCount: function() {
            return feeds.length;
        },

        getNexFeedId: function() {
            return feeds.length + 1;
        }
    };
})();

function focusFeedText() {
    //TODO: do this on leave focus
    document.getElementById("postBtn").disabled = false;
}

function clearFeedText() {
    document.getElementById("feedText").value = '';
}

function postFeed() {

    try {
        if (document.getElementById("feedText").value === '') {
            document.getElementById("postBtn").disabled = true;
            return alert("Invalid post...");
        }

        var feed = feedService.createFeed(document.getElementById("feedText").value);
        displayFeed(feed);
    } catch (err) {
        alert("Sorry! Unable to post the feed. Please try again...!");
    }
}

function displayFeed(feed) {

    var feedContent = feed instanceof TextFeed ?
                      "\t<p>" + feed.getFeed() + "</p>" :
                      "\t<a href=\"" + feed.getFeed() + "\" target=\"_blank\">" + feed.getFeed() + "</a>";

    document.getElementById("feeds").innerHTML +=
    "<div id=\"feed" + feed.getId() + "\""  + " class=\"feed-inline feed\">" +
        "<div class=\"feed-inline feed-user-image\">" + "</div>" +
        "<div class=\"feed-inline feed-content\">" + feedContent + "\n</div>" +
        "<div class=\"feed-inline feed-rsp\">" +
            "<div class=\"feed-delete\">" +
                "<button class= \"feed-delete-btn\" id=\"" + feed.getId() + "\"" +
                // " value=\"" + feed.getId + "\"" +
                " type=\"button\" onClick=\"removeFeed(this.id)\">" +
            "</div>\n" +
            "<div class=\"feed-date\">" + "\t<p>" + feed.getPostedOn() + "</p>\n</div>" +
        "</div>\n" +
    "</div>\n";

    clearFeedText();
}

function removeFeed(feedId) {

    try {

        if (!feedService.deleteFeed(feedId)) {
            return alert("Feed is not available. please delete a valid feed!");
        }

        var feedNode = document.getElementById("feed" + feedId);
        if (feedNode) {
            feedNode.parentNode.removeChild(feedNode);
            return true;
        }
    } catch (err) {
        alert("Sorry! Unable to delete the feed. Please try again...!");
    }
}
