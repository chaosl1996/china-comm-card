/**
 * china-comm-card — 中国电信 / 中国联通 套餐信息卡片
 * 适配 HACS 集成「移动运营商」(sfairy/ha_china_comm)
 * 纯原生 Web Component，无第三方依赖，自动适配明暗主题，支持 UI 可视化配置
 */
const CARD_VERSION = '1.5.0';
console.info(
  `%c CHINA-COMM-CARD %c v${CARD_VERSION} `,
  'background:#0b6ef3;color:#fff;border-radius:3px 0 0 3px;padding:2px 6px;',
  'background:#e60028;color:#fff;border-radius:0 3px 3px 0;padding:2px 6px;'
);

// 内嵌运营商 Logo（200x200 透明底 PNG，base64）
const LOGO_TELECOM = 'data:image/png;base64,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';
const LOGO_UNICOM = 'data:image/png;base64,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';

const CARRIERS = {
  telecom: { name: '中国电信', short: '电信', glyph: '电', logo: LOGO_TELECOM, c1: '#0b6ef3', c2: '#22c1f5' },
  unicom: { name: '中国联通', short: '联通', glyph: '联', logo: LOGO_UNICOM, c1: '#e60028', c2: '#ff7a45' },
};
const CU_PREFIX = ['130', '131', '132', '145', '155', '156', '166', '175', '176', '185', '186'];
const CT_PREFIX = ['133', '149', '153', '173', '177', '180', '181', '189', '190', '191', '193', '199'];

const SUFFIX = {
  phone: '_phone', balance: '_balance', data: '_data', voice: '_voice', charge: '_charge',
  service: '_service', status: '_status', online: '_online', updated: '_updated',
  level: '_level', points: '_points', calls: '_calls', sms: '_sms_remain',
};

const STYLE_KEYS = ['brand', 'minimal', 'accent', 'classic'];

const DEFAULTS = {
  title: '',
  style: 'brand',
  mask_phone: true,
  balance: { show: true, spend: true, carry: true },
  gauges: { style: 'ring', data: true, voice: true },
  show_members: true,
  show_history: true,
  chips: { show: true, net: true, sim: true, broadband: true, level: true, points: true, calls: true },
};

const withDefaults = (cfg) => {
  const c = { ...DEFAULTS, ...(cfg || {}) };
  c.style = STYLE_KEYS.includes(cfg?.style) ? cfg.style : DEFAULTS.style;
  c.balance = { ...DEFAULTS.balance, ...(cfg?.balance || {}) };
  c.gauges = { ...DEFAULTS.gauges, ...(cfg?.gauges || {}) };
  c.chips = { ...DEFAULTS.chips, ...(cfg?.chips || {}) };
  if (cfg?.show_chips !== undefined && cfg?.chips === undefined) c.chips.show = cfg.show_chips;
  c.accounts = Array.isArray(cfg?.accounts) ? cfg.accounts.map((a) => ({ entities: {}, ...a })) : [];
  return c;
};

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[m]));
const num = (v) => {
  if (v == null) return null;
  const m = String(v).match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
};
const fmt = (n) => (n == null ? '--' : (Math.round(n * 100) / 100).toString());
const fmt2 = (n) => (n == null ? null : n.toFixed(2));

class ChinaCommCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
    this._hass = null;
    this._sig = '';
    this.shadowRoot.addEventListener('click', (e) => {
      const t = e.composedPath().find((n) => n.getAttribute && n.getAttribute('data-more'));
      if (!t || !this._hass) return;
      const ev = new Event('hass-more-info', { bubbles: true, composed: true });
      const entityId = t.getAttribute('data-more');
      ev.detail = { entityId };
      ev.entityId = entityId;
      this.dispatchEvent(ev);
    });
  }

  setConfig(config) {
    if (!config || !Array.isArray(config.accounts) || config.accounts.length === 0) {
      throw new Error('china-comm-card: 需要在 accounts 中至少配置一个手机号');
    }
    this._config = withDefaults(config);
    this._sig = '';
    this.render();
  }

  get hass() {
    return this._hass;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    const sig = this._config.accounts
      .map((a) => this._resolve(a))
      .map((r) => r.list.map((e) => `${e?.entity_id}:${e?.state}`).join('|'))
      .join('#') + `@${hass?.themes?.darkMode ? 'd' : 'l'}`;
    if (sig !== this._sig) {
      this._sig = sig;
      this.render();
    }
  }

  static getStubConfig(hass) {
    const phones = new Set();
    Object.keys(hass?.states || {}).forEach((id) => {
      const m = id.match(/^sensor\.(\d{11})_balance$/);
      if (m) phones.add(m[1]);
    });
    return withDefaults({ title: '手机套餐', accounts: [...phones].map((p) => ({ phone: p })) });
  }

  static getConfigElement() {
    return document.createElement('china-comm-card-editor');
  }

  getGridSize() {
    const n = Math.min(this._config?.accounts?.length || 1, 2);
    return { columns: n === 2 ? 12 : 6, min_columns: 6, max_columns: 12 };
  }

  getCardSize() {
    return 5;
  }

  _st(entityId) {
    if (!entityId) return null;
    return this._hass?.states?.[entityId] || null;
  }

  _resolve(account) {
    const p = String(account.phone || '').replace(/\D/g, '');
    const ids = {};
    for (const [k, sfx] of Object.entries(SUFFIX)) {
      ids[k] = account.entities?.[k] || `sensor.${p}${sfx}`;
    }
    const ents = {};
    for (const k of Object.keys(SUFFIX)) ents[k] = this._st(ids[k]);
    let key = account.carrier || null;
    const ispTxt = ents.phone?.attributes?.['运营商'] || ents.balance?.attributes?.['运营商'];
    if (!key && ispTxt) {
      if (ispTxt.includes('电信')) key = 'telecom';
      else if (ispTxt.includes('联通')) key = 'unicom';
    }
    if (!key) {
      key = CU_PREFIX.includes(p.slice(0, 3)) ? 'unicom' : CT_PREFIX.includes(p.slice(0, 3)) ? 'telecom' : 'telecom';
    }
    const carrier = CARRIERS[key] || { ...CARRIERS.telecom, logo: null, name: ispTxt || '运营商', short: ispTxt || '运营商', glyph: '机' };
    const hasAny = p !== '' && Object.values(ents).some(Boolean);
    return { p, ids, ents, carrier, hasAny, list: Object.values(ents) };
  }

  _chip(text, cls = '') {
    return `<span class="chip ${cls}">${esc(text)}</span>`;
  }

  _accent(carrier) {
    return this._config?.style === 'minimal' ? 'var(--primary-color, #1a8fe8)' : carrier.c1;
  }

  _gaugeColor(pct, carrier) {
    if (pct == null) return 'var(--ccc-secondary)';
    if (pct > 0.95) return 'var(--ccc-danger)';
    if (pct > 0.85) return 'var(--ccc-warning)';
    return this._accent(carrier);
  }

  _ring(pct, color, label, remain, unit, used, total) {
    const R = 34, C = 2 * Math.PI * R;
    const p = Math.max(0, Math.min(pct ?? 0, 1));
    const off = C * (1 - p);
    return `
      <div class="ring-block">
        <div class="ring-label">${esc(label)}</div>
        <svg class="ring" viewBox="0 0 84 84">
          <circle class="ring-track" cx="42" cy="42" r="${R}"></circle>
          <circle class="ring-val" cx="42" cy="42" r="${R}" stroke="${color}"
            stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"></circle>
          <text class="ring-num" x="42" y="41">${esc(fmt(remain))}</text>
          <text class="ring-unit" x="42" y="56">${esc(unit)}</text>
        </svg>
        <div class="ring-cap">${total != null ? `已用 ${esc(fmt2(used))} / ${esc(fmt2(total))}` : '&nbsp;'}</div>
      </div>`;
  }

  _bar(pct, color, label, remain, unit, used, total) {
    const p = Math.max(0, Math.min(pct ?? 0, 1));
    return `
      <div class="bar-block">
        <div class="bar-head">
          <span class="bar-label">${esc(label)}</span>
          <span class="bar-val">${esc(fmt(remain))} ${esc(unit)}</span>
        </div>
        <div class="bar-track"><i style="width:${(p * 100).toFixed(1)}%;background:${color}"></i></div>
        <div class="bar-cap">${total != null ? `已用 ${esc(fmt2(used))} / ${esc(fmt2(total))}` : '&nbsp;'}</div>
      </div>`;
  }

  _accountHtml(a) {
    const r = this._resolve(a);
    if (!r.hasAny) return '';
    const { ents, carrier, p } = r;
    const cfg = this._config;

    const masked = cfg.mask_phone ? p.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : p;
    const name = a.name || `${carrier.name} ${masked}`;

    const bal = ents.balance;
    const balVal = num(bal?.state);
    const bAttr = bal?.attributes || {};
    const owe = bAttr['是否欠费'] === '是' || (balVal != null && balVal < 0);
    const spend = num(bAttr['本月消费']) ?? num(bAttr['本月已消费']) ?? num(ents.charge?.state);
    const carry = num(bAttr['上月结转']);

    const dAttr = ents.data?.attributes || {};
    const dTotal = num(dAttr['套餐流量总额']);
    const dUsed = num(dAttr['本月已用流量']);
    const dRemain = num(ents.data?.state) ?? num(dAttr['本月剩余流量']);
    const dPct = dTotal ? dUsed / dTotal : null;

    const vAttr = ents.voice?.attributes || {};
    const vTotal = num(vAttr['套餐通话总额']);
    const vUsed = num(vAttr['本月已用时长']);
    const vRemain = num(ents.voice?.state) ?? num(vAttr['本月剩余时长']);
    const vPct = vTotal ? vUsed / vTotal : null;

    const badge = owe
      ? `<span class="badge danger">欠费</span>`
      : ents.status?.state === '正常'
        ? `<span class="badge ok">正常</span>`
        : ents.status?.state
          ? `<span class="badge">${esc(ents.status.state)}</span>`
          : '';
    const onlineOk = ents.online?.state === '在线';

    // —— 用量图（环形 / 进度条） ——
    const g = cfg.gauges || DEFAULTS.gauges;
    const gauges = [];
    if (g.data !== false) {
      const color = this._gaugeColor(dPct, carrier);
      gauges.push(g.style === 'bar'
        ? this._bar(dPct, color, '剩余流量', dRemain, 'GB', dUsed, dTotal)
        : this._ring(dPct, color, '剩余流量', dRemain, 'GB', dUsed, dTotal));
    }
    if (g.voice !== false) {
      const color = this._gaugeColor(vPct, carrier);
      gauges.push(g.style === 'bar'
        ? this._bar(vPct, color, '剩余通话', vRemain, '分钟', vUsed, vTotal)
        : this._ring(vPct, color, '剩余通话', vRemain, '分钟', vUsed, vTotal));
    }
    const gaugesHtml = gauges.length
      ? `<div class="rings ${g.style === 'bar' ? 'col' : ''}">${gauges.join('')}</div>`
      : '';

    // —— 共享流量池成员 ——
    let membersHtml = '';
    if (cfg.show_members) {
      const members = Object.entries(dAttr)
        .filter(([k, v]) => /^(本机|副卡)\s*\(.+\)$/.test(k) && /GB/i.test(String(v)))
        .map(([k, v]) => ({ label: k.replace(/\s+/, ' '), val: num(v) }))
        .filter((m) => m.val != null);
      if (members.length > 1) {
        const max = Math.max(...members.map((m) => m.val), 0.0001);
        membersHtml = `
          <div class="block">
            <div class="block-title">共享流量池成员</div>
            ${members.map((m) => `
              <div class="member">
                <span class="m-name">${esc(m.label)}</span>
                <span class="m-bar"><i style="width:${((m.val / max) * 100).toFixed(1)}%;background:${this._accent(carrier)}"></i></span>
                <span class="m-val">${fmt(m.val)} GB</span>
              </div>`).join('')}
          </div>`;
      }
    }

    // —— 近月出账（电信） ——
    let historyHtml = '';
    if (cfg.show_history) {
      const months = Object.entries(bAttr)
        .filter(([k]) => /^历史\d+月出账/.test(k))
        .map(([k, v]) => ({ m: k.match(/历史(\d+)月出账/)[1], v: num(v) }))
        .filter((x) => x.v != null)
        .sort((x, y) => x.m - y.m);
      if (months.length >= 3) {
        const max = Math.max(...months.map((x) => x.v));
        historyHtml = `
          <div class="block">
            <div class="block-title">近月出账</div>
            <div class="h-bars">
              ${months.map((x) => `
                <div class="h-col" title="${x.m}月 ${x.v} 元">
                  <i style="height:${Math.max(6, Math.round((x.v / max) * 34))}px;background:${x.m === months[months.length - 1].m ? this._accent(carrier) : 'var(--ccc-divider)'}"></i>
                  <span>${x.m}月</span>
                </div>`).join('')}
            </div>
          </div>`;
      }
    }

    // —— 信息标签（逐项可配） ——
    let chips = '';
    const ch = cfg.chips || DEFAULTS.chips;
    if (ch.show !== false) {
      const parts = [];
      const sim = num(ents.phone?.attributes?.['名下副卡数量']);
      const bb = num(ents.phone?.attributes?.['名下宽带数量']);
      const net = ents.service?.attributes?.['网络制式'];
      if (ch.net !== false && net) parts.push(this._chip(net));
      if (ch.sim !== false && sim > 0) parts.push(this._chip(`副卡 ×${sim}`));
      if (ch.broadband !== false && bb > 0) parts.push(this._chip(`宽带 ×${bb}`));
      const lvl = ents.level;
      if (ch.level !== false && lvl?.state && lvl.state !== 'unavailable' && lvl.state !== 'unknown') {
        const pts = num(lvl.attributes?.['积分'] ?? lvl.attributes?.['可用积分']);
        parts.push(this._chip(`${lvl.state}${pts ? ` · ${fmt(pts)} 积分` : ''}`, 'accent'));
      }
      const pts2 = num(ents.points?.state);
      if (ch.points !== false && pts2 > 0) parts.push(this._chip(`积分 ${fmt(pts2)}`, 'accent'));
      const callsN = ents.calls?.attributes?.['本月通话次数'];
      if (ch.calls !== false) {
        if (typeof callsN === 'number' && callsN > 0) parts.push(this._chip(`本月通话 ${callsN} 次`));
        else if (ents.calls?.state && /授权|认证/.test(ents.calls.state)) parts.push(this._chip('详单需重新授权', 'warn'));
      }
      chips = parts.length ? `<div class="chips">${parts.join('')}</div>` : '';
    }

    let upd = '';
    const ts = ents.updated?.state;
    if (ts && /^\d{4}-\d{2}-\d{2}/.test(ts)) upd = `更新 ${ts.slice(5, 16)}`;
    const poll = ents.online?.attributes?.['轮询间隔'] || ents.updated?.attributes?.['轮询间隔'];

    return `
      <div class="account" data-more="${esc(r.ids.balance)}" role="button" tabindex="0"
        style="--acc1:${carrier.c1};--acc2:${carrier.c2};--grad:linear-gradient(135deg,${carrier.c1},${carrier.c2})">
        <div class="acc-head">
          <div class="brand${carrier.logo ? ' has-logo' : ''}"${carrier.logo ? ` style="--logo:url('${carrier.logo}')"` : ''}>${carrier.logo ? '' : carrier.glyph}</div>
          <div class="acc-title">
            <div class="acc-name">${esc(name)}</div>
            <div class="acc-sub">${esc(ents.service?.state || carrier.name)}</div>
          </div>
          <div class="acc-badges">${badge}<span class="dot ${onlineOk ? 'ok' : 'bad'}" title="${esc(ents.online?.state || '状态未知')}"></span></div>
        </div>
        ${cfg.balance?.show !== false ? `
        <div class="hero">
          <div class="bal-row">
            <span class="hero-label">话费余额</span>
            <span class="hero-value ${owe ? 'danger' : ''}">${fmt2(balVal) ?? '--'}<span class="hero-unit">元</span></span>
          </div>
          ${cfg.balance?.spend !== false && spend != null ? `
          <div class="bal-row">
            <span class="hero-label">本月消费</span>
            <span class="hero-sub">${fmt2(spend)}<span class="hero-unit">元</span></span>
          </div>` : ''}
          ${cfg.balance?.carry !== false && carry != null ? `
          <div class="bal-row">
            <span class="hero-label">上月结转</span>
            <span class="hero-sub">${fmt(carry)}<span class="hero-unit">元</span></span>
          </div>` : ''}
        </div>` : ''}
        ${gaugesHtml}
        ${membersHtml}
        ${historyHtml}
        ${chips}
        <div class="foot">
          <span class="foot-upd">${esc(upd)}${poll ? ` · ${esc(String(poll).replace(/自动更新|自动/, ''))}` : ''}</span>
        </div>
      </div>`;
  }

  render() {
    if (!this._config) return;
    const cfg = this._config;
    const accountsHtml = cfg.accounts.map((a) => this._accountHtml(a)).filter(Boolean).join('');
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --ccc-text: var(--primary-text-color, #1d2129);
          --ccc-secondary: var(--secondary-text-color, #6b7280);
          --ccc-bg: var(--card-background-color, #fff);
          --ccc-divider: var(--divider-color, rgba(0,0,0,.1));
          --ccc-danger: var(--error-color, #db4437);
          --ccc-success: var(--success-color, #34c759);
          --ccc-warning: var(--warning-color, #ff9800);
          display: block;
        }
        ha-card {
          background: var(--ccc-bg);
          border-radius: var(--ha-card-border-radius, 14px);
          border: 1px solid var(--ha-card-border-color, var(--ccc-divider));
          box-shadow: var(--ha-card-box-shadow, none);
          color: var(--ccc-text);
          padding: 14px 16px;
          box-sizing: border-box;
        }
        .card-title { font-size: 15px; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .card-title .ver { font-size: 10px; font-weight: 500; color: var(--ccc-secondary); background: var(--ccc-divider); border-radius: 8px; padding: 1px 7px; }
        .accounts { display: grid; grid-template-columns: repeat(auto-fit, minmax(272px, 1fr)); gap: 14px 24px; }
        .account { cursor: pointer; transition: opacity .2s; min-width: 0; }
        .account:hover { opacity: .9; }
        .acc-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .brand { width: 34px; height: 34px; border-radius: 10px; color: #fff; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex: none; background: var(--grad); }
        .brand.has-logo::after { content: ''; display: block; width: 100%; height: 100%; background: var(--logo-c, #fff); -webkit-mask-image: var(--logo); -webkit-mask-repeat: no-repeat; -webkit-mask-position: center; -webkit-mask-size: 72%; mask-image: var(--logo); mask-repeat: no-repeat; mask-position: center; mask-size: 72%; }
        .acc-title { min-width: 0; flex: 1; }
        .acc-name { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .acc-sub { font-size: 11px; color: var(--ccc-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }
        .acc-badges { display: flex; align-items: center; gap: 6px; flex: none; }
        .badge { font-size: 10px; padding: 2px 8px; border-radius: 8px; background: var(--ccc-divider); color: var(--ccc-secondary); white-space: nowrap; }
        .badge.ok { background: color-mix(in srgb, var(--ccc-success) 15%, transparent); color: var(--ccc-success); }
        .badge.danger { background: color-mix(in srgb, var(--ccc-danger) 15%, transparent); color: var(--ccc-danger); }
        .badge.warn { background: color-mix(in srgb, var(--ccc-warning) 15%, transparent); color: var(--ccc-warning); }
        .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ccc-secondary); flex: none; }
        .dot.ok { background: var(--ccc-success); box-shadow: 0 0 0 3px color-mix(in srgb, var(--ccc-success) 20%, transparent); }
        .dot.bad { background: var(--ccc-danger); }
        .hero { display: grid; gap: 4px; padding: 2px 0 10px; }
        .bal-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .hero-label { font-size: 11px; color: var(--ccc-secondary); }
        .hero-value { font-size: 24px; font-weight: 700; line-height: 1.1; letter-spacing: -.5px; font-variant-numeric: tabular-nums; }
        .hero-sub { font-size: 14px; font-weight: 600; color: var(--ccc-text); font-variant-numeric: tabular-nums; }
        .hero-value.danger { color: var(--ccc-danger); }
        .hero-unit { font-size: 11px; font-weight: 500; color: var(--ccc-secondary); margin-left: 3px; }
        .rings { display: flex; justify-content: space-around; gap: 8px; padding: 2px 0 6px; }
        .rings.col { flex-direction: column; gap: 12px; align-items: stretch; justify-content: flex-start; padding: 4px 0 8px; }
        .ring-block { display: flex; flex-direction: column; align-items: center; min-width: 96px; }
        .ring { width: 78px; height: 78px; }
        .ring-label { font-size: 11px; color: var(--ccc-secondary); margin-bottom: 3px; }
        .ring-track { fill: none; stroke: var(--ccc-divider); stroke-width: 8; }
        .ring-val { fill: none; stroke-width: 8; stroke-linecap: round; transform: rotate(-90deg); transform-origin: 42px 42px; transition: stroke-dashoffset .6s ease; }
        .ring-num { font-size: 14px; font-weight: 700; fill: var(--ccc-text); text-anchor: middle; font-variant-numeric: tabular-nums; }
        .ring-unit { font-size: 8.5px; fill: var(--ccc-secondary); text-anchor: middle; }
        .ring-cap { font-size: 10px; color: var(--ccc-secondary); margin-top: 3px; font-variant-numeric: tabular-nums; }
        .bar-block { width: 100%; }
        .bar-head { display: flex; justify-content: space-between; align-items: baseline; font-size: 11px; color: var(--ccc-secondary); margin-bottom: 4px; }
        .bar-val { color: var(--ccc-text); font-weight: 600; font-variant-numeric: tabular-nums; }
        .bar-track { height: 8px; border-radius: 4px; background: var(--ccc-divider); overflow: hidden; }
        .bar-track i { display: block; height: 100%; border-radius: 4px; transition: width .5s ease; }
        .bar-cap { font-size: 10px; color: var(--ccc-secondary); margin-top: 3px; text-align: right; font-variant-numeric: tabular-nums; }
        .block { margin-top: 8px; }
        .block-title { font-size: 10px; color: var(--ccc-secondary); margin-bottom: 6px; }
        .member { display: flex; align-items: center; gap: 8px; padding: 2px 0; }
        .m-name { width: 108px; font-size: 11px; color: var(--ccc-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: none; }
        .m-bar { flex: 1; height: 5px; border-radius: 3px; background: var(--ccc-divider); overflow: hidden; }
        .m-bar i { display: block; height: 100%; border-radius: 3px; }
        .m-val { font-size: 11px; color: var(--ccc-secondary); font-variant-numeric: tabular-nums; flex: none; width: 58px; text-align: right; }
        .h-bars { display: flex; align-items: flex-end; gap: 10px; height: 48px; }
        .h-col { display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .h-col i { display: block; width: 16px; border-radius: 3px 3px 1px 1px; }
        .h-col span { font-size: 9px; color: var(--ccc-secondary); }
        .chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
        .chip { font-size: 10px; padding: 2.5px 8px; border-radius: 8px; background: var(--ccc-divider); color: var(--ccc-secondary); white-space: nowrap; }
        .chip.accent { color: var(--ccc-text); }
        .chip.warn { color: var(--ccc-warning); background: color-mix(in srgb, var(--ccc-warning) 14%, transparent); }
        .foot { margin-top: 10px; display: flex; justify-content: flex-end; }
        .foot-upd { font-size: 10px; color: var(--ccc-secondary); }
        .empty { padding: 18px 6px; text-align: center; color: var(--ccc-secondary); font-size: 13px; }
        /* —— 风格：品牌卡头 —— */
        ha-card.s-brand .acc-head { background: var(--grad); border-radius: 12px; padding: 10px 12px; margin-bottom: 12px; }
        ha-card.s-brand .acc-head .brand { background: rgba(255,255,255,.22); }
        ha-card.s-brand .brand.has-logo::after { --logo-c: #fff; }
        ha-card.s-brand .acc-name { color: #fff; }
        ha-card.s-brand .acc-sub { color: rgba(255,255,255,.78); }
        ha-card.s-brand .badge { background: rgba(255,255,255,.92); color: var(--ccc-text); }
        ha-card.s-brand .badge.ok { color: #1d8a4e; }
        ha-card.s-brand .badge.danger { color: var(--ccc-danger); }
        ha-card.s-brand .badge.warn { color: #b26a00; }
        ha-card.s-brand .dot.ok { background: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,.28); }
        ha-card.s-brand .dot.bad { background: #ffd7d7; box-shadow: 0 0 0 3px rgba(255,255,255,.18); }
        /* —— 风格：极简主题 —— */
        ha-card.s-minimal .brand { background: var(--primary-color, #1a8fe8); }
        ha-card.s-minimal .brand.has-logo::after { --logo-c: #fff; }
        /* —— 风格：运营商点缀 —— */
        ha-card.s-accent .account { border-left: 3px solid var(--acc1); padding-left: 10px; }
      </style>
      <ha-card class="s-${esc(cfg.style || 'brand')}">
        ${cfg.title ? `<div class="card-title">${esc(cfg.title)}<span class="ver">v${CARD_VERSION}</span></div>` : ''}
        ${accountsHtml || '<div class="empty">未找到匹配的传感器，请检查手机号或集成是否正常</div>'}
      </ha-card>`;
  }
}

// ==================== UI 可视化配置编辑器 ====================
const EDITOR_SECTIONS = [
  {
    title: '外观',
    schema: [
      { name: 'title', label: '标题', selector: { text: {} } },
      {
        name: 'style', label: '外观风格', selector: {
          select: {
            options: [
              { value: 'brand', label: '品牌卡头' },
              { value: 'minimal', label: '极简主题' },
              { value: 'accent', label: '运营商点缀' },
              { value: 'classic', label: '经典环形' },
            ],
          },
        },
      },
      { name: 'mask_phone', label: '号码脱敏', selector: { boolean: {} } },
    ],
  },
  {
    title: '余额展示',
    schema: [
      {
        name: 'balance', label: '余额展示', type: 'grid', schema: [
          { name: 'show', label: '话费余额', selector: { boolean: {} } },
          { name: 'spend', label: '本月消费', selector: { boolean: {} } },
          { name: 'carry', label: '上月结转', selector: { boolean: {} } },
        ],
      },
    ],
  },
  {
    title: '用量图',
    schema: [
      {
        name: 'gauges', label: '用量图', type: 'grid', schema: [
          { name: 'style', label: '样式', selector: { select: { options: [{ value: 'ring', label: '环形图' }, { value: 'bar', label: '进度条' }] } } },
          { name: 'data', label: '剩余流量', selector: { boolean: {} } },
          { name: 'voice', label: '剩余通话', selector: { boolean: {} } },
        ],
      },
    ],
  },
  {
    title: '附加信息',
    schema: [
      { name: 'show_members', label: '共享流量池成员', selector: { boolean: {} } },
      { name: 'show_history', label: '近月出账', selector: { boolean: {} } },
    ],
  },
  {
    title: '信息标签',
    schema: [
      {
        name: 'chips', label: '信息标签', type: 'grid', schema: [
          { name: 'show', label: '显示标签', selector: { boolean: {} } },
          { name: 'net', label: '网络制式', selector: { boolean: {} } },
          { name: 'sim', label: '副卡数量', selector: { boolean: {} } },
          { name: 'broadband', label: '宽带', selector: { boolean: {} } },
          { name: 'level', label: '会员等级', selector: { boolean: {} } },
          { name: 'points', label: '积分', selector: { boolean: {} } },
          { name: 'calls', label: '通话次数', selector: { boolean: {} } },
        ],
      },
    ],
  },
];

class ChinaCommCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = withDefaults(config || {});
    if (!this._wrap) this._init();
    this._forms.forEach((f) => {
      if (f.data !== this._config) f.data = this._config;
    });
    this._updatePicker();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._forms) this._forms.forEach((f) => { f.hass = hass; });
    this._updatePicker();
  }

  _emit(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }

  _init() {
    const style = document.createElement('style');
    style.textContent = `
      .ccc-editor .sec-title { font-size: 12px; font-weight: 600; color: var(--secondary-text-color,#6b7280); letter-spacing: .05em; margin: 16px 0 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color,rgba(0,0,0,.08)); }
      .ccc-editor .sec-title.first { margin-top: 0; }
      .ccc-editor .acc-add { display: flex; gap: 8px; margin: 0 0 10px; }
      .ccc-editor .acc-add select { flex: 1; min-width: 0; padding: 7px 8px; border-radius: 8px; font-size: 13px; border: 1px solid var(--divider-color,rgba(0,0,0,.15)); background: var(--card-background-color,#fff); color: var(--primary-text-color,#1d2129); }
      .ccc-editor .acc-add button { border: 1px solid var(--divider-color,rgba(0,0,0,.15)); background: transparent; color: var(--primary-color,#03a9f4); border-radius: 8px; padding: 6px 12px; font-size: 13px; cursor: pointer; white-space: nowrap; }
      .ccc-editor .acc-chips { display: flex; flex-wrap: wrap; gap: 6px; }
      .ccc-editor .acc-chip { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; padding: 4px 6px 4px 10px; border-radius: 14px; background: var(--secondary-background-color,rgba(0,0,0,.06)); color: var(--primary-text-color,#1d2129); }
      .ccc-editor .acc-chip .rm { border: none; background: transparent; color: var(--secondary-text-color,#6b7280); cursor: pointer; font-size: 12px; line-height: 1; padding: 2px 4px; border-radius: 50%; }
      .ccc-editor .acc-chip .rm:hover { color: var(--error-color,#db4437); }
      .ccc-editor .acc-empty { font-size: 12px; color: var(--secondary-text-color,#6b7280); }
    `;

    const wrap = document.createElement('div');
    wrap.className = 'ccc-editor';

    // —— 账号（自绘：下拉添加 + 标签删除） ——
    const secAcc = document.createElement('div');
    const tAcc = document.createElement('div');
    tAcc.className = 'sec-title first';
    tAcc.textContent = '账号';
    const addRow = document.createElement('div');
    addRow.className = 'acc-add';
    const sel = document.createElement('select');
    sel.addEventListener('change', () => {
      const phone = sel.value;
      if (!phone) return;
      sel.value = '';
      this._emit(withDefaults({ ...this._config, accounts: [...(this._config?.accounts || []), { phone }] }));
    });
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.textContent = '手动添加';
    addBtn.addEventListener('click', () => {
      const p = (window.prompt('输入 11 位手机号') || '').replace(/\D/g, '');
      if (!p) return;
      if (!/^\d{11}$/.test(p)) { window.alert('手机号格式不正确'); return; }
      const exists = (this._config?.accounts || []).some((a) => String(a.phone || '').replace(/\D/g, '') === p);
      if (exists) { window.alert('该账号已存在'); return; }
      this._emit(withDefaults({ ...this._config, accounts: [...(this._config?.accounts || []), { phone: p }] }));
    });
    addRow.append(sel, addBtn);
    const chipsBox = document.createElement('div');
    chipsBox.className = 'acc-chips';
    secAcc.append(tAcc, addRow, chipsBox);

    // —— 分组 ha-form ——
    this._forms = [];
    const formSecs = EDITOR_SECTIONS.map(({ title, schema }) => {
      const sec = document.createElement('div');
      const t = document.createElement('div');
      t.className = 'sec-title';
      t.textContent = title;
      const form = document.createElement('ha-form');
      form.schema = schema;
      form.computeLabel = (s) => (s.type === 'grid' ? '' : (s.label || s.name));
      form.hass = this._hass || {};
      form.addEventListener('value-changed', (ev) => {
        ev.stopPropagation();
        this._emit(withDefaults({ ...this._config, ...ev.detail.value }));
      });
      sec.append(t, form);
      this._forms.push(form);
      return sec;
    });

    wrap.append(secAcc, ...formSecs);
    this.append(style, wrap);
    this._wrap = wrap;
    this._sel = sel;
    this._chips = chipsBox;
    this._updatePicker();
  }

  _updatePicker() {
    if (!this._sel || !this._chips) return;
    const states = this._hass?.states || {};
    const phones = new Set();
    Object.keys(states).forEach((id) => {
      const m = id.match(/^sensor\.(\d{11})_balance$/);
      if (m) phones.add(m[1]);
    });
    const accounts = this._config?.accounts || [];
    const existing = new Set(accounts.map((a) => String(a.phone || '').replace(/\D/g, '')));
    const avail = [...phones].filter((p) => !existing.has(p));

    const sel = this._sel;
    sel.innerHTML = '';
    const ph = document.createElement('option');
    ph.value = '';
    ph.selected = true;
    ph.disabled = true;
    ph.textContent = avail.length ? '选择集成账号添加…' : '无更多集成账号';
    sel.appendChild(ph);
    avail.forEach((p) => {
      const isp = states[`sensor.${p}_phone`]?.attributes?.['运营商'] || '';
      const o = document.createElement('option');
      o.value = p;
      o.textContent = isp ? `${p}（${isp}）` : p;
      sel.appendChild(o);
    });
    sel.disabled = avail.length === 0;

    const box = this._chips;
    box.innerHTML = '';
    if (accounts.length === 0) {
      const tip = document.createElement('span');
      tip.className = 'acc-empty';
      tip.textContent = '尚未添加账号';
      box.appendChild(tip);
    }
    accounts.forEach((a) => {
      const p = String(a.phone || '').replace(/\D/g, '');
      const chip = document.createElement('span');
      chip.className = 'acc-chip';
      const name = document.createElement('span');
      name.textContent = a.name || (p ? p.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : '未设置号码');
      const rm = document.createElement('button');
      rm.className = 'rm';
      rm.type = 'button';
      rm.textContent = '✕';
      rm.title = '移除该账号';
      rm.addEventListener('click', () => {
        this._emit(withDefaults({ ...this._config, accounts: (this._config?.accounts || []).filter((x) => x !== a) }));
      });
      chip.append(name, rm);
      box.appendChild(chip);
    });
  }
}

customElements.define('china-comm-card', ChinaCommCard);
customElements.define('china-comm-card-editor', ChinaCommCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'china-comm-card',
  name: '移动运营商信息卡片',
  description: '展示中国电信 / 中国联通（ha_china_comm 集成）的余额、流量、语音等信息，支持可视化配置',
  preview: true,
});
