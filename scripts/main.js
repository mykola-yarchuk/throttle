'use strict';

/**
 * Реализовать декоратор `throttle`:
 * Так чтобы текущие координаты мышки в консоли
 * при движении печатались раз в секунду
 * 1 раз когда мышь только шевельнулась
 * дальше каждую секунду
 * После остановки дождаться очередную секунду
 * и напечатать координаты в последний раз
 * Функция onMove должна получать тот же `this` и аргументы, что и обёртка
**/

function throttle(f) {
  return function(value) {
    f.call(this, value);
  };
}

function lastDecore(func, delay) {
  let x;

  return function(value) {
    clearTimeout(x);
    x = setTimeout(() => func.call(this, value), delay);
  };
}

function firstDecore(func) {
  return function(value) {
    func.call(this, value);
  };
}

function onMove(value) {
  throttlePositionElement.textContent
    = `x: ${value.clientX}, y: ${value.clientY}`;
}

function onMoveRealtime(value) {
  realtimePositionElement.textContent
    = `x: ${value.clientX}, y: ${value.clientY}`;
}

const realtimePositionElement = document.querySelector('#realtime');
const throttlePositionElement = document.querySelector('#throttle');

const wrapper = throttle(onMove);
const wrapper1 = lastDecore(onMove, 1000);
const wrapper2 = firstDecore(onMove);

const setting
  = () => document.addEventListener('mousemove', wrapper, { once: true });

setInterval(setting, 1000);

document.addEventListener('mousemove', onMoveRealtime);
document.addEventListener('mousemove', wrapper1);
document.addEventListener('mousemove', wrapper2, { once: true });
