# china-comm-card

Home Assistant Lovelace 自定义卡片，展示 HACS 集成 [移动运营商](https://github.com/sfairy/ha_china_comm)（中国电信 / 中国联通）的套餐用量信息。

## 功能

- 双账号同屏：电信 + 联通（支持任意多账号，响应式网格布局）
- **内嵌运营商官方 Logo**（白色电信标 / 白色中国结，base64 无外部请求），统一白色显示在运营商渐变底之上：品牌卡头为色条上白色、极简主题为主题色底、点缀/经典为渐变色块
- **四种外观风格可切换**：品牌卡头 / 极简主题 / 运营商点缀 / 经典环形（编辑器下拉或 YAML `style`）
- 话费余额 + 本月消费 + 上月结转，欠费自动红色高亮
- 流量 / 通话用量图：环形图或进度条两种样式可选，可分别开关；已用超 85% 变橙、超 95% 变红
- 联通家庭共享流量池成员用量条形图（可开关）
- 电信近月出账迷你柱状图（可开关）
- 信息标签逐项可配：网络制式、副卡、宽带、会员等级、积分、通话次数
- **支持 UI 可视化配置**（编辑器内点选标题、用量图样式、各区块开关，无需写 YAML）
- **编辑器内置账号选择器**：自动发现「移动运营商」集成的手机号，下拉直接添加，无需手动输入
- 单一平面卡片设计，多账号在同一卡片内分区展示
- 自动适配明暗主题，无第三方依赖（纯原生 Web Component）

## 预览

本地直接双击打开 `preview.html` 即可查看效果（含明暗主题、环形图/进度条切换）。

## 安装

1. 将 `china-comm-card.js` 复制到 HA 配置目录：

```bash
scp china-comm-card.js homeassistant@10.0.0.3:/config/www/
# 或通过 Samba / Studio Code Server 放到 /config/www/china-comm-card.js
```

2. 添加前端资源：**设置 → 仪表盘 → 右上角三点 → 资源 → 添加**

   - URL：`/local/china-comm-card.js`
   - 类型：`JavaScript 模块`

3. 强制刷新浏览器（Ctrl/Cmd + Shift + R）

   > 若更新版本后仍显示旧版，多半是浏览器缓存：把资源 URL 改为 `/local/china-comm-card.js?v=1.4.2`（每次更新递增 `v`），或在浏览器控制台确认横幅显示 `CHINA-COMM-CARD v1.4.2`。

之后在仪表盘添加卡片时选择「移动运营商信息卡片」即可进入 **可视化编辑器**：

- 顶部「从「移动运营商」集成选择账号」下拉框会自动列出集成中的手机号（如 `18523885098（中国联通）`），点选即添加；
- 「外观风格」可在品牌卡头 / 极简主题 / 运营商点缀 / 经典环形间切换；
- 标题、用量图样式（环形/进度条）、成员/出账/各信息标签开关、号码脱敏等均可在界面点选；
- 「账号」列表区可修改显示名或手动输入手机号，也可删除行。

## 配置

```yaml
type: custom:china-comm-card
title: 手机套餐
style: brand           # brand 品牌卡头 | minimal 极简主题 | accent 运营商点缀 | classic 经典环形
gauges:
  style: ring          # ring 环形图 | bar 进度条
  data: true           # 显示流量用量图
  voice: true          # 显示通话用量图
show_members: true     # 显示共享流量池成员
show_history: true     # 显示近月出账（电信）
chips:
  show: true           # 信息标签总开关
  net: true            # 网络制式（5G SA/NSA）
  sim: true            # 副卡数量
  broadband: true      # 宽带数量
  level: true          # 会员等级（联通）
  points: true         # 积分（电信）
  calls: true          # 本月通话次数 / 详单授权提示
mask_phone: true       # 号码脱敏（177****5098）
accounts:
  - phone: "17745135098"   # 电信
    # name: 我的电信        # 可选，自定义标题
    # carrier: telecom     # 可选，强制指定运营商
  - phone: "18523885098"   # 联通
```

### 配置项

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `title` | string | 空 | 卡片标题，不填则不显示标题栏 |
| `style` | string | `brand` | 外观风格：`brand` 运营商色卡头 / `minimal` 跟随主题主色 / `accent` 中性卡面+品牌色点缀 / `classic` 经典环形渐变 |
| `accounts` | list | 必填 | 账号列表（可在 UI 编辑器中增删） |
| `accounts[].phone` | string | 必填 | 11 位手机号，用于推导实体 ID |
| `accounts[].name` | string | 自动 | 账号显示名，默认「运营商 + 脱敏号码」 |
| `accounts[].carrier` | string | 自动 | `telecom` / `unicom`，默认按号段与实体属性识别 |
| `accounts[].entities` | map | 自动 | 手动覆盖实体 ID，如 `entities: {balance: sensor.xxx}` |
| `gauges.style` | string | `ring` | 用量图样式：`ring` 环形图 / `bar` 进度条 |
| `gauges.data` | bool | `true` | 显示流量用量图 |
| `gauges.voice` | bool | `true` | 显示通话用量图 |
| `show_members` | bool | `true` | 显示共享流量池成员用量（联通） |
| `show_history` | bool | `true` | 显示近月出账柱状图（电信） |
| `chips.show` | bool | `true` | 信息标签总开关 |
| `chips.net` / `sim` / `broadband` / `level` / `points` / `calls` | bool | `true` | 各标签逐项开关 |
| `mask_phone` | bool | `true` | 号码脱敏显示（177****5098） |

### 实体推导规则

按 `sensor.<手机号>_<后缀>` 自动解析，后缀与集成实体对应：

`_balance` 话费余额 · `_data` 剩余流量 · `_voice` 剩余语音 · `_charge` 本月消费 · `_service` 套餐 · `_status` 账户状态 · `_online` 在线状态 · `_updated` 最近更新 · `_level` 会员等级（联通）· `_points` 积分（电信）· `_calls` 通话记录 · `_sms_remain` 剩余短信（联通）· `_phone` 号码信息

缺失的实体自动跳过，不影响其他区块展示。

## 主题适配

卡片读取 HA 主题变量（`--primary-text-color`、`--card-background-color`、`--divider-color`、`--error-color` 等），明暗主题自动切换。运营商品牌色可在 `china-comm-card.js` 顶部 `CARRIERS` 常量中修改。

## 常见问题

- **卡片显示"未找到匹配的传感器"**：确认 ha_china_comm 集成已配置且该手机号的传感器存在（开发者工具 → 状态 中搜索号码）。
- **"详单需重新授权"**：集成侧通话/短信详单二次认证过期，与卡片无关。
- **点击卡片无反应**：more-info 弹窗仅在 HA 仪表盘内生效，`preview.html` 本地预览不会弹出。
