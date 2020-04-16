let currentScene = null;
let chapter = 1;
const displaySlidingSpeed = 7000;

let guideEnable = true;
let chapterClear = false;

const bgmVolume = 0.2;
// const bgmVolume = 0.001;
let muteSoundVolume = 0.0001;

let introSnd = true;
let pause = true;
let device;
let scene = '';
let reset;
let soundEnabled = true;
let bgmEnabled = true;
let mainController;
let tutorialDisabled = false;
let pop = false;
let finish = false;
const guideRepeatTime = 2;

let gameFocus = true;
let updateObject = null;

let guideRemove = false;
let currentGuideSound = null;

let cheatOn = false;

let helpBtn = null;
const appUrl = 'https://jr.msdl.naver.com/jrapp?cmd=close&type=webview&version=1';
const appEnabledString = 'app';
const webEnabledString = 'web';


export default class GameConfig {

    static get INTRO_SND_PLAY() {return introSnd; }
    static set INTRO_SND_PLAY(bool) {introSnd = bool; }
    static get CURRENT_SCENE() { return currentScene}
    static set CURRENT_SCENE(obj){currentScene = obj; }
    static get GAME_RESET() { return reset;}
    static set GAME_RESET(bool) { reset = bool;}
    static get SCENE_STATE() { return scene; }
    static set SCENE_STATE(str) {scene = str; }

    static get IN_GAME() { return pause; }
    static set IN_GAME(bool) { return pause = bool; }

    static get CURRENT_CHAPTER() { return chapter;}
    static set CURRENT_CHAPTER(num) { chapter = num;}

    static get CHAPTER_CLEAR() { return chapterClear;}
    static set CHAPTER_CLEAR(bool) { chapterClear = bool;}

    static get GUIDE_REMOVE() { return guideRemove; }
    static set GUIDE_REMOVE(bool) { guideRemove = bool; }

    static get SOUND_ENABLED() {return soundEnabled; }
    static set SOUND_ENABLED(bool) {soundEnabled = bool; }

    static get BGM_ENABLED() {return bgmEnabled; }
    static set BGM_ENABLED(bool) {bgmEnabled = bool; }


    static get CURRENT_DEVICE()  { return device; }
    static set CURRENT_DEVICE(str)  { device = str; }

    static get MAIN_CONTROLLER() { return mainController; }
    static set MAIN_CONTROLLER(obj) { mainController = obj; }

    static get TUTORIAL_DISABLED() {return tutorialDisabled ; }
    static set TUTORIAL_DISABLED(bool) {tutorialDisabled = bool;}

    static get POP_ENABLED() { return pop;}
    static set POP_ENABLED(bool) { pop = bool; }

    static get GAME_FINISH() { return finish; }
    static set GAME_FINISH(bool) { finish = bool; }

    static get BGM_VOLUME() { return bgmVolume; }

    static get MUTE_SOUND_VOLUME() { return muteSoundVolume; }

    static get HELP_BUTTON() { return helpBtn; }
    static set HELP_BUTTON(obj) { helpBtn = obj; }

    static get GUIDE_REPEAT_TIME() { return guideRepeatTime; }
    static get GUIDE_ENABLED() { return guideEnable; }
    static set GUIDE_ENABLED(bool) { guideEnable = bool; }

    static set GAME_FOCUS(bool) { gameFocus = bool; }
    static get GAME_FOCUS() { return gameFocus; }

    static get UPDATE_OBJECT() { return updateObject; }
    static set UPDATE_OBJECT(obj) { updateObject = obj; }

    static get CURRENT_GUIDE_SOUND() { return currentGuideSound; }
    static set CURRENT_GUIDE_SOUND(obj) { currentGuideSound = obj; }

    static get DISPLAY_SLIDING_SPEED() { return displaySlidingSpeed; }

    static get CHEAT_ON() { return cheatOn; }
    static set CHEAT_ON(bool) { cheatOn = bool; }

    static get CHECK_APP_STRING() { return appEnabledString; }
    static get CHECK_WEB_STRING() { return webEnabledString; }
    static get APP_URL() { return appUrl; }


}
