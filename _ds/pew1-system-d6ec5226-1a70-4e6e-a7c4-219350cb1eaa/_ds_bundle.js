/* @ds-bundle: {"format":3,"namespace":"PEWDesignSystem_d6ec52","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"SectionLabel","sourcePath":"components/surfaces/SectionLabel.jsx"},{"name":"Badge","sourcePath":"components/tags/Badge.jsx"},{"name":"Tag","sourcePath":"components/tags/Tag.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"b274aa992f4e","components/forms/Input.jsx":"8b63d1a4eee9","components/surfaces/Card.jsx":"962636d54393","components/surfaces/SectionLabel.jsx":"19f197d68c5a","components/tags/Badge.jsx":"f78af442f882","components/tags/Tag.jsx":"e7665e94904e","export/pew1-site/app.jsx":"344f4a91eb4f","export/pew1-site/extra.jsx":"fbc8823e8be9","export/pew1-site/lib.jsx":"4146fc4dc558","export/pew1-site/products.jsx":"24d7fc41ef88","export/pew1-site/sections.jsx":"aca9bfc3bbad","export/pew1-theme/assets/pew1.js":"7f869272f707","ui_kits/portfolio/app.jsx":"344f4a91eb4f","ui_kits/portfolio/extra.jsx":"3163adbd2ad1","ui_kits/portfolio/lib.jsx":"4146fc4dc558","ui_kits/portfolio/portafolio.jsx":"2d521733c120","ui_kits/portfolio/products.jsx":"dd40d03de040","ui_kits/portfolio/sections.jsx":"586c187e4d7b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PEWDesignSystem_d6ec52 = window.PEWDesignSystem_d6ec52 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PEWÏ Button — hard-edged, screen-printed feel.
 * Variants: primary (ink), accent (spray orange), secondary (outline), ghost.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  full = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 14px',
      font: 'var(--fs-sm)',
      gap: '8px',
      icon: 16
    },
    md: {
      padding: '12px 22px',
      font: 'var(--fs-body)',
      gap: '10px',
      icon: 18
    },
    lg: {
      padding: '16px 30px',
      font: 'var(--fs-lg)',
      gap: '12px',
      icon: 20
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: full ? 'flex' : 'inline-flex',
    width: full ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontFamily: 'var(--font-text)',
    fontWeight: 700,
    fontSize: s.font,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: '2px solid transparent',
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    opacity: disabled ? 0.45 : 1,
    userSelect: 'none',
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--pewi-ink)',
      color: '#fff',
      borderColor: 'var(--pewi-ink)'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--pewi-ink)',
      borderColor: 'var(--pewi-ink)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--pewi-ink)',
      borderColor: 'var(--pewi-ink)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--pewi-ink)',
      borderColor: 'transparent'
    }
  };
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = variants[variant] || variants.primary;
  let hoverStyle = {};
  if (hover && !disabled) {
    if (variant === 'primary') hoverStyle = {
      background: 'var(--pewi-gray-700)'
    };
    if (variant === 'accent') hoverStyle = {
      background: 'var(--accent-hover)'
    };
    if (variant === 'secondary') hoverStyle = {
      background: 'var(--pewi-ink)',
      color: '#fff'
    };
    if (variant === 'ghost') hoverStyle = {
      background: 'rgba(11,11,13,0.06)'
    };
  }
  const pressStyle = press && !disabled ? {
    transform: 'translate(1px,1px) scale(0.985)'
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...v,
      ...hoverStyle,
      ...pressStyle,
      ...style
    }
  }, rest), iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.icon,
      height: s.icon
    }
  }, iconLeft) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.icon,
      height: s.icon
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PEWÏ Input — keyline text field with orange focus.
 * Supports label, multiline (textarea), and error state.
 */
function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 4,
  error = '',
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (label ? `f-${String(label).replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const field = {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-text)',
    fontSize: 'var(--fs-body)',
    color: 'var(--text-strong)',
    background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
    border: `2px solid ${error ? '#C0392B' : focus ? 'var(--accent)' : 'var(--pewi-ink)'}`,
    borderRadius: 'var(--radius-sm)',
    padding: '12px 14px',
    outline: 'none',
    transition: 'border-color var(--dur-base) var(--ease-out)',
    resize: multiline ? 'vertical' : undefined,
    lineHeight: multiline ? 1.5 : 1.2
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 'var(--fs-xs)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label) : null, multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: '#C0392B',
      fontWeight: 600
    }
  }, error) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PEWÏ Card — content surface.
 * variant: "flat" (hairline), "key" (2px ink keyline),
 *          "poster" (keyline + hard offset shadow, the brand's signature),
 *          "inverse" (navy, light text).
 * Pass `interactive` for hover lift / stamp.
 */
function Card({
  children,
  variant = 'flat',
  interactive = false,
  accent = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    background: 'var(--surface-card)',
    color: 'var(--text-body)',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--sp-6)',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    cursor: interactive ? 'pointer' : 'default'
  };
  const variants = {
    flat: {
      border: '1px solid var(--border-hair)',
      boxShadow: 'var(--shadow-sm)'
    },
    key: {
      border: '2px solid var(--pewi-ink)'
    },
    poster: {
      border: '2px solid var(--pewi-ink)',
      boxShadow: accent ? 'var(--shadow-hard-accent)' : 'var(--shadow-hard)'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-dark)',
      border: '2px solid var(--pewi-ink)'
    }
  };
  let hoverStyle = {};
  if (interactive && hover) {
    if (variant === 'poster') {
      hoverStyle = {
        transform: 'translate(3px,3px)',
        boxShadow: accent ? '3px 3px 0 var(--pewi-orange)' : '3px 3px 0 var(--pewi-ink)'
      };
    } else {
      hoverStyle = {
        transform: 'translateY(-3px)',
        boxShadow: 'var(--shadow-md)'
      };
    }
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...(variants[variant] || variants.flat),
      ...hoverStyle,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PEWÏ SectionLabel — the widely-tracked uppercase eyebrow used across the
 * brand manual, with the optional 4px accent rule beneath it.
 */
function SectionLabel({
  children,
  rule = false,
  color,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: color || 'var(--accent)'
    }
  }, children), rule ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 4,
      background: 'var(--accent)',
      marginTop: 10
    }
  }) : null);
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/tags/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PEWÏ Badge — small status / count marker. Square-ish, keyline aesthetic.
 */
function Badge({
  children,
  variant = 'solid',
  style = {},
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 9px',
    fontFamily: 'var(--font-text)',
    fontWeight: 700,
    fontSize: 'var(--fs-xs)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--pewi-ink)'
  };
  const variants = {
    solid: {
      background: 'var(--pewi-ink)',
      color: '#fff'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--pewi-ink)'
    },
    amber: {
      background: 'var(--accent-2)',
      color: 'var(--pewi-ink)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--pewi-ink)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...(variants[variant] || variants.solid),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tags/Badge.jsx", error: String((e && e.message) || e) }); }

// components/tags/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PEWÏ Tag — pill chip for art categories (mural, stencil, lettering…).
 * Optionally selectable; selected fills with ink.
 */
function Tag({
  children,
  selected = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '7px 15px',
    fontFamily: 'var(--font-text)',
    fontWeight: 600,
    fontSize: 'var(--fs-sm)',
    letterSpacing: '0.02em',
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    border: '2px solid var(--pewi-ink)',
    cursor: clickable ? 'pointer' : 'default',
    transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    userSelect: 'none'
  };
  const filled = selected || hover && clickable;
  const skin = filled ? {
    background: 'var(--pewi-ink)',
    color: '#fff'
  } : {
    background: 'transparent',
    color: 'var(--pewi-ink)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...skin,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tags/Tag.jsx", error: String((e && e.message) || e) }); }

// export/pew1-site/app.jsx
try { (() => {
/* root: cart state + drawer, product lightbox, smooth nav */
const {
  useState
} = React;

/* ---------- CART DRAWER ---------- */
function CartDrawer({
  open,
  items,
  onClose,
  onRemove
}) {
  if (!open) return null;
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 70,
      background: 'rgba(6,10,31,0.82)',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    className: "cart-panel",
    style: {
      width: 'min(420px,100%)',
      height: '100%',
      background: 'var(--surface-card)',
      borderLeft: '2px solid var(--pewi-ink)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--pewi-navy)',
      color: '#fff',
      padding: '22px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 22
    }
  }, "Tu carrito"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 24,
    color: "#fff"
  }))), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: 28,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shopping-bag",
    size: 40,
    color: "var(--text-faint)"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      color: 'var(--text-muted)',
      fontSize: 15
    }
  }, "Tu carrito est\xE1 vac\xEDo."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onClose
  }, "Seguir comprando")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 0'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: {
      display: 'flex',
      gap: 14,
      padding: '16px 24px',
      borderBottom: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 78,
      flexShrink: 0,
      border: '2px solid var(--pewi-ink)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: it.img,
    alt: it.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 3px',
      fontFamily: 'var(--font-text)',
      fontWeight: 800,
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, it.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 12,
      color: 'var(--text-faint)',
      marginBottom: 6
    }
  }, it.kind, " \xB7 x", it.qty), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, clp(it.price * it.qty))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(it.id),
    "aria-label": "Quitar",
    style: {
      alignSelf: 'flex-start',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash-2",
    size: 18
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '2px solid var(--pewi-ink)',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, clp(total))), /*#__PURE__*/React.createElement(Button, {
    full: true,
    size: "lg",
    variant: "accent"
  }, "Finalizar compra"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: 'center',
      fontFamily: 'var(--font-text)',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, "Env\xEDos a todo Chile y el mundo.")))));
}

/* ---------- ROOT ---------- */
function App() {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const add = p => {
    setCart(c => {
      const ex = c.find(i => i.id === p.id);
      if (ex) return c.map(i => i.id === p.id ? {
        ...i,
        qty: i.qty + 1
      } : i);
      return [...c, {
        ...p,
        qty: 1
      }];
    });
    setCartOpen(true);
  };
  const remove = id => setCart(c => c.filter(i => i.id !== id));
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const nav = id => {
    if (id === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.offsetTop - 68,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, {
    cartCount: count,
    onCart: () => setCartOpen(true),
    onNav: nav
  }), /*#__PURE__*/React.createElement(Hero, {
    onNav: nav
  }), /*#__PURE__*/React.createElement(ShopSection, {
    id: "originales",
    label: "Obras originales",
    title: "Piezas \xFAnicas",
    cat: "Originales",
    onOpen: setProduct,
    onAdd: add
  }), /*#__PURE__*/React.createElement(ShopSection, {
    id: "shop",
    label: "Fine Art Print",
    title: "Edici\xF3n limitada",
    cat: "Prints",
    dark: true,
    onOpen: setProduct,
    onAdd: add
  }), /*#__PURE__*/React.createElement(ShopSection, {
    id: "coleccionables",
    label: "Coleccionables",
    title: "Stickers & objetos",
    cat: "Coleccionables",
    onOpen: setProduct,
    onAdd: add
  }), /*#__PURE__*/React.createElement(SizBand, null), /*#__PURE__*/React.createElement(VideoBand, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(News, null), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(ProductLightbox, {
    p: product,
    onClose: () => setProduct(null),
    onAdd: add
  }), /*#__PURE__*/React.createElement(CartDrawer, {
    open: cartOpen,
    items: cart,
    onClose: () => setCartOpen(false),
    onRemove: remove
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/pew1-site/app.jsx", error: String((e && e.message) || e) }); }

// export/pew1-site/extra.jsx
try { (() => {
/* Video band, Noticias teaser, Contacto form */
const A3 = 'assets/';

/* ---------- VIDEO BAND ---------- */
function VideoBand() {
  const [play, setPlay] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--pewi-ink)',
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    rule: true,
    color: "var(--accent)",
    style: {
      display: 'inline-block',
      textAlign: 'left'
    }
  }, "En movimiento"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 'clamp(1.8rem,4vw,2.8rem)',
      lineHeight: 1,
      margin: '14px 0 0'
    }
  }, "Conoce m\xE1s de mi trabajo")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 920,
      margin: '0 auto',
      border: '2px solid var(--pewi-ink)',
      boxShadow: 'var(--shadow-hard-accent)',
      aspectRatio: '16/9',
      background: '#000',
      overflow: 'hidden'
    }
  }, play ? /*#__PURE__*/React.createElement("iframe", {
    title: "PEW1 video",
    src: "https://www.youtube.com/embed/4c45_PCagrI?autoplay=1&rel=0",
    allow: "autoplay; encrypted-media; fullscreen",
    allowFullScreen: true,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      border: 0
    }
  }) : /*#__PURE__*/React.createElement("button", {
    onClick: () => setPlay(true),
    "aria-label": "Reproducir",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      border: 0,
      cursor: 'pointer',
      background: 'var(--pewi-navy)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A3 + 'work/life-studio.jpg',
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 84,
      height: 84,
      borderRadius: 999,
      background: 'var(--accent)',
      border: '2px solid var(--pewi-ink)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 34,
    color: "var(--pewi-ink)"
  }))))));
}

/* ---------- NOTICIAS ---------- */
const NEWS = [{
  id: 'amazon',
  tag: 'Bitácora',
  date: 'Mayo 2026',
  title: 'Mi viaje al AmazonArte, Perú',
  img: A3 + 'work/life-prints.jpg',
  excerpt: 'Una residencia entre la selva y el muro: nuevas referencias, fauna y color para la próxima serie.'
}, {
  id: 'siz',
  tag: 'Lanzamiento',
  date: 'Abril 2026',
  title: 'Nace SIZ Street Wear',
  img: A3 + 'work/siz-streetwear.jpg',
  excerpt: 'La marca de ropa de calle del universo PEW1 abre su preventa oficial.'
}];
function News() {
  return /*#__PURE__*/React.createElement("section", {
    id: "noticias",
    style: {
      background: 'var(--surface-page)',
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    rule: true
  }, "Noticias"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(1.8rem,4vw,2.8rem)',
      lineHeight: 1,
      margin: '16px 0 32px',
      color: 'var(--text-strong)'
    }
  }, "Desde el taller"), /*#__PURE__*/React.createElement("div", {
    className: "news-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 26
    }
  }, NEWS.map(n => /*#__PURE__*/React.createElement(Card, {
    key: n.id,
    variant: "key",
    interactive: true,
    style: {
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/9',
      borderBottom: '2px solid var(--pewi-ink)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: n.img,
    alt: n.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "accent"
  }, n.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, n.date)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontWeight: 800,
      fontSize: 20,
      color: 'var(--text-strong)'
    }
  }, n.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--text-body)'
    }
  }, n.excerpt), /*#__PURE__*/React.createElement("a", {
    style: {
      marginTop: 4,
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, "Leer m\xE1s ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 15,
    color: "var(--accent)"
  }))))))));
}

/* ---------- CONTACTO ---------- */
function Contact() {
  const [sent, setSent] = React.useState(false);
  const [f, setF] = React.useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });
  const set = k => e => setF(s => ({
    ...s,
    [k]: e.target.value
  }));
  const submit = () => {
    if (f.nombre && f.correo && f.mensaje) setSent(true);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "contacto",
    style: {
      background: 'var(--pewi-navy)',
      padding: '80px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap contact-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    rule: true,
    color: "var(--accent)"
  }, "Contacto"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 'clamp(2rem,4.4vw,3.2rem)',
      lineHeight: 1.02,
      margin: '16px 0 18px'
    }
  }, "\xBFUna idea,", /*#__PURE__*/React.createElement("br", null), "un muro, un encargo?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 17,
      lineHeight: 1.65,
      color: 'var(--text-on-dark-mut)',
      maxWidth: 420,
      margin: '0 0 26px'
    }
  }, "Murales, obra original y comisiones. Cu\xE9ntame qu\xE9 quieres transformar y te respondo en 1\u20132 d\xEDas."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 22,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "youtube",
    size: 22,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 22,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "poster",
    accent: true,
    style: {
      background: 'var(--surface-card)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 16,
      padding: '24px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      border: '2px solid var(--pewi-ink)',
      background: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 30,
    color: "var(--pewi-ink)",
    stroke: 3
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 24,
      color: 'var(--text-strong)'
    }
  }, "\xA1Mensaje enviado!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontSize: 15,
      color: 'var(--text-body)'
    }
  }, "Gracias, ", f.nombre.split(' ')[0] || 'crack', ". Te escribo pronto."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => {
      setSent(false);
      setF({
        nombre: '',
        correo: '',
        mensaje: ''
      });
    }
  }, "Enviar otro")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nombre",
    placeholder: "\xBFC\xF3mo te llamas?",
    value: f.nombre,
    onChange: set('nombre')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Correo",
    type: "email",
    placeholder: "tu@correo.com",
    value: f.correo,
    onChange: set('correo')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Mensaje",
    multiline: true,
    rows: 4,
    placeholder: "Cu\xE9ntame tu idea\u2026",
    value: f.mensaje,
    onChange: set('mensaje')
  }), /*#__PURE__*/React.createElement(Button, {
    full: true,
    size: "lg",
    variant: "accent",
    onClick: submit
  }, "Enviar mensaje")))));
}
Object.assign(window, {
  VideoBand,
  News,
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/pew1-site/extra.jsx", error: String((e && e.message) || e) }); }

// export/pew1-site/lib.jsx
try { (() => {
/* ui_kits/portfolio/lib.jsx
   Thin, self-contained mirrors of the PEWÏ DS primitives so the kit renders
   standalone in preview. Visuals + tokens match components/* exactly.
   Exposed on window for the screen files. */
const {
  useState
} = React;
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  full = false,
  type = 'button',
  onClick,
  style = {}
}) {
  const sizes = {
    sm: {
      padding: '8px 14px',
      font: 'var(--fs-sm)',
      gap: '8px',
      icon: 16
    },
    md: {
      padding: '12px 22px',
      font: 'var(--fs-body)',
      gap: '10px',
      icon: 18
    },
    lg: {
      padding: '16px 30px',
      font: 'var(--fs-lg)',
      gap: '12px',
      icon: 20
    }
  };
  const s = sizes[size] || sizes.md;
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const base = {
    display: full ? 'flex' : 'inline-flex',
    width: full ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontFamily: 'var(--font-text)',
    fontWeight: 700,
    fontSize: s.font,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: '2px solid transparent',
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    opacity: disabled ? 0.45 : 1,
    userSelect: 'none',
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--pewi-ink)',
      color: '#fff',
      borderColor: 'var(--pewi-ink)'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--pewi-ink)',
      borderColor: 'var(--pewi-ink)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--pewi-ink)',
      borderColor: 'var(--pewi-ink)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--pewi-ink)',
      borderColor: 'transparent'
    }
  };
  const v = variants[variant] || variants.primary;
  let hov = {};
  if (hover && !disabled) {
    if (variant === 'primary') hov = {
      background: 'var(--pewi-gray-700)'
    };
    if (variant === 'accent') hov = {
      background: 'var(--accent-hover)'
    };
    if (variant === 'secondary') hov = {
      background: 'var(--pewi-ink)',
      color: '#fff'
    };
    if (variant === 'ghost') hov = {
      background: 'rgba(11,11,13,0.06)'
    };
  }
  const pr = press && !disabled ? {
    transform: 'translate(1px,1px) scale(0.985)'
  } : {};
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...v,
      ...hov,
      ...pr,
      ...style
    }
  }, iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.icon,
      height: s.icon
    }
  }, iconLeft) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.icon,
      height: s.icon
    }
  }, iconRight) : null);
}
function Badge({
  children,
  variant = 'solid',
  style = {}
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 9px',
    fontFamily: 'var(--font-text)',
    fontWeight: 700,
    fontSize: 'var(--fs-xs)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--pewi-ink)'
  };
  const variants = {
    solid: {
      background: 'var(--pewi-ink)',
      color: '#fff'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--pewi-ink)'
    },
    amber: {
      background: 'var(--accent-2)',
      color: 'var(--pewi-ink)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--pewi-ink)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...base,
      ...(variants[variant] || variants.solid),
      ...style
    }
  }, children);
}
function Tag({
  children,
  selected = false,
  onClick,
  style = {}
}) {
  const [hover, setHover] = useState(false);
  const clickable = !!onClick;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '7px 15px',
    fontFamily: 'var(--font-text)',
    fontWeight: 600,
    fontSize: 'var(--fs-sm)',
    letterSpacing: '0.02em',
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    border: '2px solid var(--pewi-ink)',
    cursor: clickable ? 'pointer' : 'default',
    transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    userSelect: 'none'
  };
  const filled = selected || hover && clickable;
  const skin = filled ? {
    background: 'var(--pewi-ink)',
    color: '#fff'
  } : {
    background: 'transparent',
    color: 'var(--pewi-ink)'
  };
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...skin,
      ...style
    }
  }, children);
}
function Card({
  children,
  variant = 'flat',
  interactive = false,
  accent = false,
  onClick,
  style = {}
}) {
  const [hover, setHover] = useState(false);
  const base = {
    background: 'var(--surface-card)',
    color: 'var(--text-body)',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--sp-6)',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    cursor: interactive ? 'pointer' : 'default'
  };
  const variants = {
    flat: {
      border: '1px solid var(--border-hair)',
      boxShadow: 'var(--shadow-sm)'
    },
    key: {
      border: '2px solid var(--pewi-ink)'
    },
    poster: {
      border: '2px solid var(--pewi-ink)',
      boxShadow: accent ? 'var(--shadow-hard-accent)' : 'var(--shadow-hard)'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-dark)',
      border: '2px solid var(--pewi-ink)'
    }
  };
  let hov = {};
  if (interactive && hover) {
    if (variant === 'poster') {
      hov = {
        transform: 'translate(3px,3px)',
        boxShadow: accent ? '3px 3px 0 var(--pewi-orange)' : '3px 3px 0 var(--pewi-ink)'
      };
    } else {
      hov = {
        transform: 'translateY(-3px)',
        boxShadow: 'var(--shadow-md)'
      };
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...(variants[variant] || variants.flat),
      ...hov,
      ...style
    }
  }, children);
}
function SectionLabel({
  children,
  rule = false,
  color,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: color || 'var(--accent)'
    }
  }, children), rule ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 4,
      background: 'var(--accent)',
      marginTop: 10
    }
  }) : null);
}
function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 4,
  error = '',
  disabled = false,
  style = {}
}) {
  const [focus, setFocus] = useState(false);
  const field = {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-text)',
    fontSize: 'var(--fs-body)',
    color: 'var(--text-strong)',
    background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
    border: `2px solid ${error ? '#C0392B' : focus ? 'var(--accent)' : 'var(--pewi-ink)'}`,
    borderRadius: 'var(--radius-sm)',
    padding: '12px 14px',
    outline: 'none',
    transition: 'border-color var(--dur-base) var(--ease-out)',
    resize: multiline ? 'vertical' : undefined,
    lineHeight: multiline ? 1.5 : 1.2
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 'var(--fs-xs)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label) : null, multiline ? /*#__PURE__*/React.createElement("textarea", {
    rows: rows,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field
  }) : /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field
  }), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: '#C0392B',
      fontWeight: 600
    }
  }, error) : null);
}

/* Lucide icon helper — renders an inline svg via data-lucide (kebab name) */
function Icon({
  name,
  size = 20,
  stroke = 2,
  color = 'currentColor',
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (!host || !window.lucide) return;
    host.innerHTML = `<i data-lucide="${name}"></i>`;
    window.lucide.createIcons({
      attrs: {
        width: size,
        height: size,
        'stroke-width': stroke
      },
      nameAttr: 'data-lucide',
      root: host
    });
  }, [name, size, stroke]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      color,
      width: size,
      height: size,
      ...style
    }
  });
}
Object.assign(window, {
  Button,
  Badge,
  Tag,
  Card,
  SectionLabel,
  Input,
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/pew1-site/lib.jsx", error: String((e && e.message) || e) }); }

// export/pew1-site/products.jsx
try { (() => {
/* Real catalog from sarkpew1.com (visualization model) + product card/lightbox */
const W = 'assets/work/';
const clp = n => '$' + n.toLocaleString('es-CL') + ' CLP';
const PRODUCTS = [
// Obras originales
{
  id: 'sombras',
  title: '"Sombras y Vuelo"',
  kind: 'Original Paint',
  cat: 'Originales',
  price: 850000,
  img: W + 'sombras.jpg',
  blurb: 'Óleo sobre tela. Una mujer y un cuervo fundidos en una misma imagen — luz verde y azul sobre fondo profundo.'
}, {
  id: 'rugido',
  title: '"Rugido"',
  kind: 'Original Paint',
  cat: 'Originales',
  price: 950000,
  img: W + 'rugido.jpg',
  blurb: 'Pantera, colibrí y rostro en un mismo gesto: la fuerza y la fragilidad habitando el mismo cuerpo.'
}, {
  id: 'sagrado',
  title: '"Sagrado Prohibido"',
  kind: 'Original Paint',
  cat: 'Originales',
  price: 850000,
  img: W + 'sagrado.jpg',
  blurb: 'Composición original donde lo humano y lo animal se reconocen como una sola naturaleza.'
},
// Fine art prints
{
  id: 'prohibido',
  title: '"Prohibido"',
  kind: 'Fine Art Print',
  cat: 'Prints',
  price: 30000,
  img: W + 'prohibido.jpg',
  blurb: 'Print de edición limitada, serie artista. Impresión fine art de alta fidelidad.'
}, {
  id: 'confianza',
  title: '"Confianza"',
  kind: 'Fine Art Print',
  cat: 'Prints',
  price: 30000,
  img: W + 'confianza.jpg',
  blurb: 'Print de edición limitada, serie artista. Impresión fine art de alta fidelidad.'
}, {
  id: 'jaguar',
  title: 'JAGUAR',
  kind: 'Fine Art Print',
  cat: 'Prints',
  price: 30000,
  img: W + 'jaguar.jpg',
  blurb: 'El jaguar y el rostro humano — print de edición limitada de la serie artista.'
},
// Coleccionables
{
  id: 'st-mural',
  title: 'Set Stickers PEW1 Mural',
  kind: 'Coleccionable',
  cat: 'Coleccionables',
  price: 5000,
  img: W + 'stickers-mural.png',
  sold: true,
  blurb: '5 unidades coleccionables. Stickers troquelados con las obras del muro.'
}, {
  id: 'st-graffiti',
  title: 'Set Stickers PEW1 Graffiti',
  kind: 'Coleccionable',
  cat: 'Coleccionables',
  price: 5000,
  img: W + 'stickers-graffiti.png',
  sold: true,
  blurb: '5 unidades coleccionables. Edición graffiti.'
}, {
  id: 'tazones',
  title: 'Tazones PEW1',
  kind: 'Coleccionable',
  cat: 'Coleccionables',
  price: 12000,
  img: W + 'tazones.jpg',
  sold: true,
  blurb: 'Tazón cerámico con el ícono PEW1.'
}];
function byCat(cat) {
  return PRODUCTS.filter(p => p.cat === cat);
}

/* ---------- PRODUCT CARD ---------- */
function ProductCard({
  p,
  onOpen,
  onAdd
}) {
  return /*#__PURE__*/React.createElement(Card, {
    variant: "poster",
    interactive: true,
    onClick: () => onOpen(p),
    style: {
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4/5',
      background: 'var(--surface-sunken)',
      borderBottom: '2px solid var(--pewi-ink)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), p.sold ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "solid"
  }, "Agotado")) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, p.kind), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontWeight: 800,
      fontSize: 17,
      lineHeight: 1.2,
      color: 'var(--text-strong)'
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, clp(p.price)), p.sold ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    disabled: true
  }, "Agotado") : /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "accent",
    onClick: e => {
      e.stopPropagation();
      onAdd(p);
    }
  }, "A\xF1adir"))));
}

/* ---------- PRODUCT LIGHTBOX ---------- */
function ProductLightbox({
  p,
  onClose,
  onAdd
}) {
  if (!p) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      background: 'rgba(6,10,31,0.86)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    className: "pl-card",
    style: {
      background: 'var(--surface-card)',
      border: '2px solid var(--pewi-ink)',
      boxShadow: 'var(--shadow-hard)',
      maxWidth: 900,
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-sunken)',
      borderRight: '2px solid var(--pewi-ink)',
      minHeight: 280
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '30px 30px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, p.kind), p.sold ? /*#__PURE__*/React.createElement(Badge, {
    variant: "solid"
  }, "Agotado") : null), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 30,
      lineHeight: 1,
      color: 'var(--text-strong)'
    }
  }, p.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, clp(p.price)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--text-body)'
    }
  }, p.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 14
    }
  }, p.sold ? /*#__PURE__*/React.createElement(Button, {
    full: true,
    variant: "secondary",
    disabled: true
  }, "Agotado") : /*#__PURE__*/React.createElement(Button, {
    full: true,
    size: "lg",
    variant: "accent",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "shopping-bag",
      size: 18
    }),
    onClick: () => {
      onAdd(p);
      onClose();
    }
  }, "A\xF1adir al carrito")))));
}
Object.assign(window, {
  PRODUCTS,
  byCat,
  clp,
  ProductCard,
  ProductLightbox
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/pew1-site/products.jsx", error: String((e && e.message) || e) }); }

// export/pew1-site/sections.jsx
try { (() => {
/* nav, hero, shop sections, SIZ band, about, footer */
const A2 = 'assets/';
const NAV = [['shop', 'Shop'], ['portfolio', 'Portfolio'], ['siz', 'SIZ Street Wear'], ['noticias', 'Noticias'], ['contacto', 'Contacto']];

/* ---------- NAV ---------- */
function Nav({
  cartCount,
  onCart,
  onNav
}) {
  const [open, setOpen] = React.useState(false);
  const go = id => {
    setOpen(false);
    onNav(id);
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--pewi-navy)',
      borderBottom: '2px solid var(--pewi-ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      height: 68,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go('top'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A2 + 'pewi-icon-white.png',
    alt: "PEW1",
    style: {
      height: 32
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: A2 + 'pewi-wordmark-white.png',
    alt: "PEW1",
    style: {
      height: 16,
      marginTop: 2
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "nav-links"
  }, NAV.map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    onClick: () => go(id),
    className: "navlink",
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-text)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.06em',
      color: 'var(--text-on-dark)',
      textTransform: 'uppercase'
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCart,
    "aria-label": "Carrito",
    style: {
      position: 'relative',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      display: 'inline-flex',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shopping-bag",
    size: 22,
    color: "#fff"
  }), cartCount > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -4,
      right: -6,
      minWidth: 18,
      height: 18,
      padding: '0 4px',
      background: 'var(--accent)',
      color: 'var(--pewi-ink)',
      borderRadius: 999,
      fontFamily: 'var(--font-text)',
      fontSize: 11,
      fontWeight: 800,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1.5px solid var(--pewi-ink)'
    }
  }, cartCount) : null), /*#__PURE__*/React.createElement("button", {
    className: "menu-btn",
    onClick: () => setOpen(o => !o),
    "aria-label": "Men\xFA",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'x' : 'menu',
    size: 24,
    color: "#fff"
  })))), open ? /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu",
    style: {
      borderTop: '1px solid var(--border-on-dark)',
      background: 'var(--pewi-navy)',
      padding: '10px 0 16px'
    }
  }, NAV.map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    onClick: () => go(id),
    style: {
      display: 'block',
      padding: '13px 28px',
      cursor: 'pointer',
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: '0.05em',
      color: 'var(--text-on-dark)',
      textTransform: 'uppercase',
      borderBottom: '1px solid var(--border-on-dark)'
    }
  }, label))) : null);
}

/* ---------- HERO (full-bleed gallery) ---------- */
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 'min(86vh,720px)',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      background: 'var(--pewi-ink)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A2 + 'work/hero.png',
    alt: "Galer\xEDa PEW1",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(10,15,46,0.30) 0%, rgba(10,15,46,0.10) 40%, rgba(10,15,46,0.92) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: 'relative',
      padding: '0 28px 64px',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 6,
      height: 24,
      background: 'var(--accent)',
      borderRadius: 3,
      transform: 'rotate(-22deg)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 6,
      height: 24,
      background: 'var(--accent)',
      borderRadius: 3
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 6,
      height: 24,
      background: 'var(--accent)',
      borderRadius: 3,
      transform: 'rotate(22deg)'
    }
  })), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title",
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 'clamp(2.4rem,6vw,4.8rem)',
      lineHeight: 0.96,
      letterSpacing: '-0.01em',
      margin: 0,
      maxWidth: 780
    }
  }, "El ser humano", /*#__PURE__*/React.createElement("br", null), "y lo ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "salvaje"), ",", /*#__PURE__*/React.createElement("br", null), "una sola imagen"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'clamp(15px,2vw,18px)',
      lineHeight: 1.55,
      color: 'var(--text-on-dark)',
      maxWidth: 560,
      margin: '22px 0 30px'
    }
  }, "Mi obra explora la relaci\xF3n entre el ser humano y el mundo animal a trav\xE9s de composiciones que los integran en una misma imagen. \u2014 Nicolas Sark Pew1."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => onNav('originales')
  }, "Obras originales"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav('shop'),
    style: {
      color: '#fff',
      borderColor: '#fff'
    }
  }, "Ver shop"))));
}

/* ---------- SHOP SECTION (reusable) ---------- */
function ShopSection({
  id,
  label,
  title,
  cat,
  dark = false,
  onOpen,
  onAdd
}) {
  const items = byCat(cat);
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: dark ? 'var(--pewi-navy)' : 'var(--surface-page)',
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    rule: true,
    color: dark ? 'var(--accent)' : undefined
  }, label), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(1.8rem,4vw,2.8rem)',
      lineHeight: 1,
      margin: '16px 0 32px',
      color: dark ? '#fff' : 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, items.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    p: p,
    onOpen: onOpen,
    onAdd: onAdd
  })))));
}

/* ---------- SIZ STREET WEAR BAND ---------- */
function SizBand({}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "siz",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--pewi-ink)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A2 + 'work/siz-streetwear.jpg',
    alt: "SIZ Street Wear",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(11,11,13,0.86) 0%, rgba(11,11,13,0.55) 60%, rgba(11,11,13,0.3) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: 'relative',
      padding: '88px 28px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "accent"
  }, "Nuevo lanzamiento"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 'clamp(2rem,5vw,3.6rem)',
      lineHeight: 1,
      margin: '18px 0 14px',
      maxWidth: 560
    }
  }, "SIZ Street Wear"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--text-on-dark)',
      maxWidth: 480,
      margin: '0 0 28px'
    }
  }, "Nueva l\xEDnea de ropa de calle del universo PEW1. Preventa oficial abierta."), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg"
  }, "Preventa oficial")));
}

/* ---------- ABOUT ---------- */
function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "portfolio",
    style: {
      background: 'var(--surface-card)',
      padding: '76px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap about-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--pewi-ink)',
      boxShadow: 'var(--shadow-hard)',
      overflow: 'hidden',
      aspectRatio: '4/3'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A2 + 'work/life-studio.jpg',
    alt: "Estudio PEW1",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    rule: true
  }, "El artista"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(1.8rem,3.6vw,2.8rem)',
      lineHeight: 1.02,
      margin: '16px 0 18px',
      color: 'var(--text-strong)'
    }
  }, "Nicolas Sark Pew1"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--text-body)',
      margin: '0 0 16px'
    }
  }, "Artista urbano. Mi trabajo integra el rostro humano y el mundo animal en una misma composici\xF3n: cuervos, panteras, jaguares y colibr\xEDes que conviven con la piel y la mirada."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--text-body)',
      margin: '0 0 26px'
    }
  }, "Del muro a la tela y al print de edici\xF3n limitada \u2014 arte que transforma espacios y conecta emociones."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Conoce mi trabajo"))));
}

/* ---------- FOOTER ---------- */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--pewi-navy)',
      color: 'var(--text-on-dark-mut)',
      borderTop: '2px solid var(--pewi-ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap footer-row",
    style: {
      padding: '36px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A2 + 'pewi-icon-white.png',
    alt: "PEW1",
    style: {
      height: 28
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 13,
      letterSpacing: '0.03em'
    }
  }, "\xA9 2026 Nicolas Sark Pew1 \u2014 Arte que transforma.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 20,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "youtube",
    size: 20,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 20,
    color: "#fff"
  }))));
}
Object.assign(window, {
  Nav,
  Hero,
  ShopSection,
  SizBand,
  About,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/pew1-site/sections.jsx", error: String((e && e.message) || e) }); }

// export/pew1-theme/assets/pew1.js
try { (() => {
/* PEW1 theme — minimal interactivity (mobile menu + video facade) */
(function () {
  // Mobile menu toggle
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-menu-toggle]');
    if (t) {
      var nav = document.getElementById('MobileNav');
      if (nav) {
        var open = nav.style.display === 'block';
        nav.style.display = open ? 'none' : 'block';
        t.setAttribute('aria-expanded', String(!open));
      }
    }
    // Video facade -> load YouTube
    var v = e.target.closest('[data-video]');
    if (v) {
      var id = v.getAttribute('data-video');
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
      frame.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
      frame.setAttribute('allowfullscreen', '');
      frame.title = 'PEW1 video';
      v.replaceWith(frame);
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/pew1-theme/assets/pew1.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/app.jsx
try { (() => {
/* root: cart state + drawer, product lightbox, smooth nav */
const {
  useState
} = React;

/* ---------- CART DRAWER ---------- */
function CartDrawer({
  open,
  items,
  onClose,
  onRemove
}) {
  if (!open) return null;
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 70,
      background: 'rgba(6,10,31,0.82)',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    className: "cart-panel",
    style: {
      width: 'min(420px,100%)',
      height: '100%',
      background: 'var(--surface-card)',
      borderLeft: '2px solid var(--pewi-ink)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--pewi-navy)',
      color: '#fff',
      padding: '22px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 22
    }
  }, "Tu carrito"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 24,
    color: "#fff"
  }))), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: 28,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shopping-bag",
    size: 40,
    color: "var(--text-faint)"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      color: 'var(--text-muted)',
      fontSize: 15
    }
  }, "Tu carrito est\xE1 vac\xEDo."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onClose
  }, "Seguir comprando")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 0'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: {
      display: 'flex',
      gap: 14,
      padding: '16px 24px',
      borderBottom: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 78,
      flexShrink: 0,
      border: '2px solid var(--pewi-ink)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: it.img,
    alt: it.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 3px',
      fontFamily: 'var(--font-text)',
      fontWeight: 800,
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, it.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 12,
      color: 'var(--text-faint)',
      marginBottom: 6
    }
  }, it.kind, " \xB7 x", it.qty), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, clp(it.price * it.qty))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(it.id),
    "aria-label": "Quitar",
    style: {
      alignSelf: 'flex-start',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash-2",
    size: 18
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '2px solid var(--pewi-ink)',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, clp(total))), /*#__PURE__*/React.createElement(Button, {
    full: true,
    size: "lg",
    variant: "accent"
  }, "Finalizar compra"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: 'center',
      fontFamily: 'var(--font-text)',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, "Env\xEDos a todo Chile y el mundo.")))));
}

/* ---------- ROOT ---------- */
function App() {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const add = p => {
    setCart(c => {
      const ex = c.find(i => i.id === p.id);
      if (ex) return c.map(i => i.id === p.id ? {
        ...i,
        qty: i.qty + 1
      } : i);
      return [...c, {
        ...p,
        qty: 1
      }];
    });
    setCartOpen(true);
  };
  const remove = id => setCart(c => c.filter(i => i.id !== id));
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const nav = id => {
    if (id === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.offsetTop - 68,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, {
    cartCount: count,
    onCart: () => setCartOpen(true),
    onNav: nav
  }), /*#__PURE__*/React.createElement(Hero, {
    onNav: nav
  }), /*#__PURE__*/React.createElement(ShopSection, {
    id: "originales",
    label: "Obras originales",
    title: "Piezas \xFAnicas",
    cat: "Originales",
    onOpen: setProduct,
    onAdd: add
  }), /*#__PURE__*/React.createElement(ShopSection, {
    id: "shop",
    label: "Fine Art Print",
    title: "Edici\xF3n limitada",
    cat: "Prints",
    dark: true,
    onOpen: setProduct,
    onAdd: add
  }), /*#__PURE__*/React.createElement(ShopSection, {
    id: "coleccionables",
    label: "Coleccionables",
    title: "Stickers & objetos",
    cat: "Coleccionables",
    onOpen: setProduct,
    onAdd: add
  }), /*#__PURE__*/React.createElement(SizBand, null), /*#__PURE__*/React.createElement(VideoBand, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(News, null), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(ProductLightbox, {
    p: product,
    onClose: () => setProduct(null),
    onAdd: add
  }), /*#__PURE__*/React.createElement(CartDrawer, {
    open: cartOpen,
    items: cart,
    onClose: () => setCartOpen(false),
    onRemove: remove
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/extra.jsx
try { (() => {
/* Video band, Noticias teaser, Contacto form */
const A3 = '../../assets/';

/* ---------- VIDEO BAND ---------- */
function VideoBand() {
  const [play, setPlay] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--pewi-ink)',
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    rule: true,
    color: "var(--accent)",
    style: {
      display: 'inline-block',
      textAlign: 'left'
    }
  }, "En movimiento"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 'clamp(1.8rem,4vw,2.8rem)',
      lineHeight: 1,
      margin: '14px 0 0'
    }
  }, "Conoce m\xE1s de mi trabajo")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 920,
      margin: '0 auto',
      border: '2px solid var(--pewi-ink)',
      boxShadow: 'var(--shadow-hard-accent)',
      aspectRatio: '16/9',
      background: '#000',
      overflow: 'hidden'
    }
  }, play ? /*#__PURE__*/React.createElement("iframe", {
    title: "PEW1 video",
    src: "https://www.youtube.com/embed/4c45_PCagrI?autoplay=1&rel=0",
    allow: "autoplay; encrypted-media; fullscreen",
    allowFullScreen: true,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      border: 0
    }
  }) : /*#__PURE__*/React.createElement("button", {
    onClick: () => setPlay(true),
    "aria-label": "Reproducir",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      border: 0,
      cursor: 'pointer',
      background: 'var(--pewi-navy)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A3 + 'work/life-studio.jpg',
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 84,
      height: 84,
      borderRadius: 999,
      background: 'var(--accent)',
      border: '2px solid var(--pewi-ink)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 34,
    color: "var(--pewi-ink)"
  }))))));
}

/* ---------- NOTICIAS ---------- */
const NEWS = [{
  id: 'amazon',
  tag: 'Bitácora',
  date: 'Mayo 2026',
  title: 'Mi viaje al AmazonArte, Perú',
  img: A3 + 'work/life-prints.jpg',
  excerpt: 'Una residencia entre la selva y el muro: nuevas referencias, fauna y color para la próxima serie.'
}, {
  id: 'siz',
  tag: 'Lanzamiento',
  date: 'Abril 2026',
  title: 'Nace SIZ Street Wear',
  img: A3 + 'work/siz-streetwear.jpg',
  excerpt: 'La marca de ropa de calle del universo PEW1 abre su preventa oficial.'
}];
function News() {
  return /*#__PURE__*/React.createElement("section", {
    id: "noticias",
    style: {
      background: 'var(--surface-page)',
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    rule: true
  }, "Noticias"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(1.8rem,4vw,2.8rem)',
      lineHeight: 1,
      margin: '16px 0 32px',
      color: 'var(--text-strong)'
    }
  }, "Desde el taller"), /*#__PURE__*/React.createElement("div", {
    className: "news-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 26
    }
  }, NEWS.map(n => /*#__PURE__*/React.createElement(Card, {
    key: n.id,
    variant: "key",
    interactive: true,
    style: {
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/9',
      borderBottom: '2px solid var(--pewi-ink)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: n.img,
    alt: n.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "accent"
  }, n.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, n.date)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontWeight: 800,
      fontSize: 20,
      color: 'var(--text-strong)'
    }
  }, n.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--text-body)'
    }
  }, n.excerpt), /*#__PURE__*/React.createElement("a", {
    style: {
      marginTop: 4,
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, "Leer m\xE1s ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 15,
    color: "var(--accent)"
  }))))))));
}

/* ---------- CONTACTO ---------- */
function Contact() {
  const [sent, setSent] = React.useState(false);
  const [f, setF] = React.useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });
  const set = k => e => setF(s => ({
    ...s,
    [k]: e.target.value
  }));
  const submit = () => {
    if (f.nombre && f.correo && f.mensaje) setSent(true);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "contacto",
    style: {
      background: 'var(--pewi-navy)',
      padding: '80px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap contact-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    rule: true,
    color: "var(--accent)"
  }, "Contacto"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 'clamp(2rem,4.4vw,3.2rem)',
      lineHeight: 1.02,
      margin: '16px 0 18px'
    }
  }, "\xBFUna idea,", /*#__PURE__*/React.createElement("br", null), "un muro, un encargo?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 17,
      lineHeight: 1.65,
      color: 'var(--text-on-dark-mut)',
      maxWidth: 420,
      margin: '0 0 26px'
    }
  }, "Murales, obra original y comisiones. Cu\xE9ntame qu\xE9 quieres transformar y te respondo en 1\u20132 d\xEDas."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 22,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "youtube",
    size: 22,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 22,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "poster",
    accent: true,
    style: {
      background: 'var(--surface-card)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 16,
      padding: '24px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      border: '2px solid var(--pewi-ink)',
      background: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 30,
    color: "var(--pewi-ink)",
    stroke: 3
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 24,
      color: 'var(--text-strong)'
    }
  }, "\xA1Mensaje enviado!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontSize: 15,
      color: 'var(--text-body)'
    }
  }, "Gracias, ", f.nombre.split(' ')[0] || 'crack', ". Te escribo pronto."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => {
      setSent(false);
      setF({
        nombre: '',
        correo: '',
        mensaje: ''
      });
    }
  }, "Enviar otro")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nombre",
    placeholder: "\xBFC\xF3mo te llamas?",
    value: f.nombre,
    onChange: set('nombre')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Correo",
    type: "email",
    placeholder: "tu@correo.com",
    value: f.correo,
    onChange: set('correo')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Mensaje",
    multiline: true,
    rows: 4,
    placeholder: "Cu\xE9ntame tu idea\u2026",
    value: f.mensaje,
    onChange: set('mensaje')
  }), /*#__PURE__*/React.createElement(Button, {
    full: true,
    size: "lg",
    variant: "accent",
    onClick: submit
  }, "Enviar mensaje")))));
}
Object.assign(window, {
  VideoBand,
  News,
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/extra.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/lib.jsx
try { (() => {
/* ui_kits/portfolio/lib.jsx
   Thin, self-contained mirrors of the PEWÏ DS primitives so the kit renders
   standalone in preview. Visuals + tokens match components/* exactly.
   Exposed on window for the screen files. */
const {
  useState
} = React;
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  full = false,
  type = 'button',
  onClick,
  style = {}
}) {
  const sizes = {
    sm: {
      padding: '8px 14px',
      font: 'var(--fs-sm)',
      gap: '8px',
      icon: 16
    },
    md: {
      padding: '12px 22px',
      font: 'var(--fs-body)',
      gap: '10px',
      icon: 18
    },
    lg: {
      padding: '16px 30px',
      font: 'var(--fs-lg)',
      gap: '12px',
      icon: 20
    }
  };
  const s = sizes[size] || sizes.md;
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const base = {
    display: full ? 'flex' : 'inline-flex',
    width: full ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontFamily: 'var(--font-text)',
    fontWeight: 700,
    fontSize: s.font,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: '2px solid transparent',
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    opacity: disabled ? 0.45 : 1,
    userSelect: 'none',
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--pewi-ink)',
      color: '#fff',
      borderColor: 'var(--pewi-ink)'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--pewi-ink)',
      borderColor: 'var(--pewi-ink)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--pewi-ink)',
      borderColor: 'var(--pewi-ink)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--pewi-ink)',
      borderColor: 'transparent'
    }
  };
  const v = variants[variant] || variants.primary;
  let hov = {};
  if (hover && !disabled) {
    if (variant === 'primary') hov = {
      background: 'var(--pewi-gray-700)'
    };
    if (variant === 'accent') hov = {
      background: 'var(--accent-hover)'
    };
    if (variant === 'secondary') hov = {
      background: 'var(--pewi-ink)',
      color: '#fff'
    };
    if (variant === 'ghost') hov = {
      background: 'rgba(11,11,13,0.06)'
    };
  }
  const pr = press && !disabled ? {
    transform: 'translate(1px,1px) scale(0.985)'
  } : {};
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...v,
      ...hov,
      ...pr,
      ...style
    }
  }, iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.icon,
      height: s.icon
    }
  }, iconLeft) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.icon,
      height: s.icon
    }
  }, iconRight) : null);
}
function Badge({
  children,
  variant = 'solid',
  style = {}
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 9px',
    fontFamily: 'var(--font-text)',
    fontWeight: 700,
    fontSize: 'var(--fs-xs)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--pewi-ink)'
  };
  const variants = {
    solid: {
      background: 'var(--pewi-ink)',
      color: '#fff'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--pewi-ink)'
    },
    amber: {
      background: 'var(--accent-2)',
      color: 'var(--pewi-ink)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--pewi-ink)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...base,
      ...(variants[variant] || variants.solid),
      ...style
    }
  }, children);
}
function Tag({
  children,
  selected = false,
  onClick,
  style = {}
}) {
  const [hover, setHover] = useState(false);
  const clickable = !!onClick;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '7px 15px',
    fontFamily: 'var(--font-text)',
    fontWeight: 600,
    fontSize: 'var(--fs-sm)',
    letterSpacing: '0.02em',
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    border: '2px solid var(--pewi-ink)',
    cursor: clickable ? 'pointer' : 'default',
    transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    userSelect: 'none'
  };
  const filled = selected || hover && clickable;
  const skin = filled ? {
    background: 'var(--pewi-ink)',
    color: '#fff'
  } : {
    background: 'transparent',
    color: 'var(--pewi-ink)'
  };
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...skin,
      ...style
    }
  }, children);
}
function Card({
  children,
  variant = 'flat',
  interactive = false,
  accent = false,
  onClick,
  style = {}
}) {
  const [hover, setHover] = useState(false);
  const base = {
    background: 'var(--surface-card)',
    color: 'var(--text-body)',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--sp-6)',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    cursor: interactive ? 'pointer' : 'default'
  };
  const variants = {
    flat: {
      border: '1px solid var(--border-hair)',
      boxShadow: 'var(--shadow-sm)'
    },
    key: {
      border: '2px solid var(--pewi-ink)'
    },
    poster: {
      border: '2px solid var(--pewi-ink)',
      boxShadow: accent ? 'var(--shadow-hard-accent)' : 'var(--shadow-hard)'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-dark)',
      border: '2px solid var(--pewi-ink)'
    }
  };
  let hov = {};
  if (interactive && hover) {
    if (variant === 'poster') {
      hov = {
        transform: 'translate(3px,3px)',
        boxShadow: accent ? '3px 3px 0 var(--pewi-orange)' : '3px 3px 0 var(--pewi-ink)'
      };
    } else {
      hov = {
        transform: 'translateY(-3px)',
        boxShadow: 'var(--shadow-md)'
      };
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...(variants[variant] || variants.flat),
      ...hov,
      ...style
    }
  }, children);
}
function SectionLabel({
  children,
  rule = false,
  color,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: color || 'var(--accent)'
    }
  }, children), rule ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 4,
      background: 'var(--accent)',
      marginTop: 10
    }
  }) : null);
}
function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 4,
  error = '',
  disabled = false,
  style = {}
}) {
  const [focus, setFocus] = useState(false);
  const field = {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-text)',
    fontSize: 'var(--fs-body)',
    color: 'var(--text-strong)',
    background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
    border: `2px solid ${error ? '#C0392B' : focus ? 'var(--accent)' : 'var(--pewi-ink)'}`,
    borderRadius: 'var(--radius-sm)',
    padding: '12px 14px',
    outline: 'none',
    transition: 'border-color var(--dur-base) var(--ease-out)',
    resize: multiline ? 'vertical' : undefined,
    lineHeight: multiline ? 1.5 : 1.2
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 'var(--fs-xs)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label) : null, multiline ? /*#__PURE__*/React.createElement("textarea", {
    rows: rows,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field
  }) : /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field
  }), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: '#C0392B',
      fontWeight: 600
    }
  }, error) : null);
}

/* Lucide icon helper — renders an inline svg via data-lucide (kebab name) */
function Icon({
  name,
  size = 20,
  stroke = 2,
  color = 'currentColor',
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (!host || !window.lucide) return;
    host.innerHTML = `<i data-lucide="${name}"></i>`;
    window.lucide.createIcons({
      attrs: {
        width: size,
        height: size,
        'stroke-width': stroke
      },
      nameAttr: 'data-lucide',
      root: host
    });
  }, [name, size, stroke]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      color,
      width: size,
      height: size,
      ...style
    }
  });
}
Object.assign(window, {
  Button,
  Badge,
  Tag,
  Card,
  SectionLabel,
  Input,
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/lib.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/portafolio.jsx
try { (() => {
/* PEW1 — Portafolio: data + gallery + lightbox + CTA
   Reuses primitives from lib.jsx (Button, Tag, Badge, Icon). */
const AP = '../../assets/';
const PIEZAS = [{
  id: 'rugido',
  title: 'Rugido',
  cat: 'Lienzo',
  medium: 'Acrílico sobre lienzo',
  year: '2025',
  size: '130 × 97 cm',
  img: AP + 'work/rugido.jpg',
  ratio: '97/130',
  desc: 'Pantera negra y rostro se funden en un solo gesto. El colibrí, frágil y eléctrico, sostiene la tensión entre lo salvaje y lo humano.'
}, {
  id: 'sombras',
  title: 'Sombras',
  cat: 'Lienzo',
  medium: 'Óleo sobre lienzo',
  year: '2024',
  size: '120 × 100 cm',
  img: AP + 'work/sombras.jpg',
  ratio: '100/120',
  desc: 'Un cuervo irrumpe sobre un retrato en clave fría. Verde y azul eléctrico para hablar de intuición, vuelo y lo que no se dice.'
}, {
  id: 'sagrado',
  title: 'Sagrado',
  cat: 'Lienzo',
  medium: 'Acrílico y aerosol sobre lienzo',
  year: '2025',
  size: '116 × 89 cm',
  img: AP + 'work/sagrado.jpg',
  ratio: '89/116',
  desc: 'La serpiente blanca como muda y renacimiento. Naranjas encendidos y el detalle del retrato urbano que firma mi obra.'
}, {
  id: 'jaguar',
  title: 'Jaguar',
  cat: 'Fine Art Print',
  medium: 'Giclée, edición limitada',
  year: '2025',
  size: 'A2 · 42 × 59,4 cm',
  img: AP + 'work/jaguar.jpg',
  ratio: '1/1',
  desc: 'El jaguar amazónico sobre el rostro. Impresión fine art de tirada corta, numerada y firmada a mano.'
}, {
  id: 'confianza',
  title: 'Confianza',
  cat: 'Fine Art Print',
  medium: 'Giclée, edición limitada',
  year: '2024',
  size: 'A2 · 42 × 59,4 cm',
  img: AP + 'work/confianza.jpg',
  ratio: '1/1',
  desc: 'Caracal y colibrí en un abrazo improbable. Sobre el calor del retrato, la confianza entre presa y cazador.'
}, {
  id: 'prohibido',
  title: 'Prohibido',
  cat: 'Fine Art Print',
  medium: 'Giclée, edición limitada',
  year: '2025',
  size: 'A2 · 42 × 59,4 cm',
  img: AP + 'work/prohibido.jpg',
  ratio: '1/1',
  desc: 'La pieza "Sagrado" llevada a papel. Impresión fine art numerada, lista para enmarcar.'
}, {
  id: 'mural-st',
  title: 'Stickers en muro',
  cat: 'Calle',
  medium: 'Intervención urbana',
  year: '2024',
  size: 'Variable',
  img: AP + 'work/stickers-mural.png',
  ratio: '4/3',
  desc: 'El ícono PEW1 y los stickers viviendo en la calle, donde nace todo el trabajo.'
}, {
  id: 'graffiti',
  title: 'Pieza en muro',
  cat: 'Calle',
  medium: 'Aerosol sobre muro',
  year: '2023',
  size: 'Variable',
  img: AP + 'work/stickers-graffiti.png',
  ratio: '4/3',
  desc: 'Lettering y personaje. La raíz graffiti detrás de cada retrato.'
}];
const FILTROS = ['Todo', 'Lienzo', 'Fine Art Print', 'Calle'];

/* ---------- NAV (compacta, propia del portafolio) ---------- */
function PortNav({
  onInquire
}) {
  const [open, setOpen] = React.useState(false);
  const links = [['galeria', 'Galería'], ['proceso', 'Proceso'], ['contacto', 'Contacto']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--pewi-navy)',
      borderBottom: '2px solid var(--pewi-ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      height: 68,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: AP + 'pewi-icon-white.png',
    alt: "PEW1",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: AP + 'pewi-wordmark-white.png',
    alt: "PEW1",
    style: {
      height: 15,
      marginTop: 2
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "port-nav",
    style: {
      display: 'flex',
      gap: 28,
      alignItems: 'center'
    }
  }, links.map(([id, l]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    style: {
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: '#fff'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--accent)',
    onMouseLeave: e => e.currentTarget.style.color = '#fff'
  }, l)), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "sm",
    onClick: onInquire
  }, "Encargar obra")), /*#__PURE__*/React.createElement("button", {
    className: "port-burger",
    onClick: () => setOpen(o => !o),
    "aria-label": "Men\xFA",
    style: {
      display: 'none',
      background: 'none',
      border: 0,
      color: '#fff',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: 26,
    color: "#fff"
  }))), open && /*#__PURE__*/React.createElement("nav", {
    style: {
      borderTop: '1px solid rgba(255,255,255,.16)'
    }
  }, links.map(([id, l]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    onClick: () => setOpen(false),
    style: {
      display: 'block',
      padding: '13px 22px',
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: '.05em',
      textTransform: 'uppercase',
      color: '#fff',
      borderBottom: '1px solid rgba(255,255,255,.16)'
    }
  }, l)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 22px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    full: true,
    onClick: onInquire
  }, "Encargar obra"))));
}

/* ---------- HERO / STATEMENT ---------- */
function PortHero() {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: 'relative',
      background: 'var(--pewi-ink)',
      color: '#fff',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: AP + 'work/sombras.jpg',
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: .28
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg,rgba(10,15,46,.5),rgba(11,11,13,.82) 70%,var(--pewi-ink))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: 'relative',
      padding: '92px 28px 84px',
      maxWidth: 1000
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 6,
      height: 24,
      background: 'var(--accent)',
      borderRadius: 3,
      transform: 'rotate(-22deg)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 6,
      height: 24,
      background: 'var(--accent)',
      borderRadius: 3
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 6,
      height: 24,
      background: 'var(--accent)',
      borderRadius: 3,
      transform: 'rotate(22deg)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Portafolio \xB7 Nicolas Sark Pew1"), /*#__PURE__*/React.createElement("h1", {
    className: "h-display",
    style: {
      color: '#fff',
      fontSize: 'clamp(2.6rem,6.5vw,5rem)',
      margin: '14px 0 0',
      maxWidth: 880
    }
  }, "El ser humano", /*#__PURE__*/React.createElement("br", null), "y lo ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "salvaje"), ",", /*#__PURE__*/React.createElement("br", null), "una sola imagen"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'clamp(16px,2vw,19px)',
      lineHeight: 1.6,
      color: 'rgba(255,255,255,.82)',
      maxWidth: 600,
      margin: '26px 0 0'
    }
  }, "Mi obra explora la relaci\xF3n entre el ser humano y el mundo animal a trav\xE9s de composiciones que los integran en una misma imagen. Retrato, naturaleza y ra\xEDz urbana \u2014 pintura, mural y edici\xF3n fine art.")));
}

/* ---------- GALERÍA ---------- */
function Galeria({
  onOpen
}) {
  const [f, setF] = React.useState('Todo');
  const shown = f === 'Todo' ? PIEZAS : PIEZAS.filter(p => p.cat === f);
  return /*#__PURE__*/React.createElement("section", {
    id: "galeria",
    className: "section",
    style: {
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Obra seleccionada"), /*#__PURE__*/React.createElement("hr", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 20,
      flexWrap: 'wrap',
      margin: '16px 0 30px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h-display",
    style: {
      fontSize: 'clamp(1.8rem,4vw,2.8rem)',
      margin: 0
    }
  }, "Galer\xEDa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, FILTROS.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    selected: f === c,
    onClick: () => setF(c)
  }, c)))), /*#__PURE__*/React.createElement("div", {
    className: "masonry"
  }, shown.map(p => /*#__PURE__*/React.createElement("figure", {
    key: p.id,
    className: "masonry__item",
    onClick: () => onOpen(p)
  }, /*#__PURE__*/React.createElement("div", {
    className: "masonry__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.title,
    loading: "lazy",
    style: {
      aspectRatio: p.ratio
    }
  }), /*#__PURE__*/React.createElement("figcaption", {
    className: "masonry__cap"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "badge badge--accent",
    style: {
      marginBottom: 8
    }
  }, p.cat), /*#__PURE__*/React.createElement("div", {
    className: "masonry__title"
  }, p.title), /*#__PURE__*/React.createElement("div", {
    className: "masonry__meta"
  }, p.medium, " \xB7 ", p.year)), /*#__PURE__*/React.createElement("span", {
    className: "masonry__plus"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 20,
    color: "var(--pewi-ink)"
  })))))))));
}

/* ---------- LIGHTBOX ---------- */
function PortLightbox({
  pieza,
  onClose,
  onInquire
}) {
  if (!pieza) return null;
  const isPrint = pieza.cat === 'Fine Art Print';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    className: "lb"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    className: "lb__panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: pieza.img,
    alt: pieza.title
  })), /*#__PURE__*/React.createElement("div", {
    className: "lb__info"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    className: "lb__close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge badge--accent"
  }, pieza.cat), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, pieza.year)), /*#__PURE__*/React.createElement("h2", {
    className: "h-display",
    style: {
      fontSize: 32,
      margin: '0 0 14px'
    }
  }, pieza.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.65,
      color: 'var(--text-body)',
      margin: '0 0 20px'
    }
  }, pieza.desc), /*#__PURE__*/React.createElement("dl", {
    className: "lb__spec"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "T\xE9cnica"), /*#__PURE__*/React.createElement("dd", null, pieza.medium)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Medidas"), /*#__PURE__*/React.createElement("dd", null, pieza.size))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 22,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: onInquire
  }, isPrint ? 'Comprar print' : 'Consultar disponibilidad'), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onInquire
  }, "Encargar similar")))));
}

/* ---------- PROCESO + CTA ---------- */
function Proceso({
  onInquire
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "proceso",
    className: "section section--dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr .9fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "El proceso"), /*#__PURE__*/React.createElement("hr", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "h-display",
    style: {
      color: '#fff',
      fontSize: 'clamp(1.8rem,4vw,2.8rem)',
      margin: '16px 0 18px'
    }
  }, "De la calle", /*#__PURE__*/React.createElement("br", null), "al lienzo"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.7,
      color: 'rgba(255,255,255,.82)',
      maxWidth: 480,
      margin: '0 0 16px'
    }
  }, "Cada pieza parte del retrato y de la observaci\xF3n animal. Trabajo por encargo para muros, marcas y colecci\xF3n privada \u2014 del boceto a la obra terminada."), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: onInquire
  }, "Cu\xE9ntame tu idea")), /*#__PURE__*/React.createElement("div", {
    className: "proceso-imgs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "split__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: AP + 'work/life-studio.jpg',
    alt: "En el taller"
  })), /*#__PURE__*/React.createElement("div", {
    className: "split__media",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: AP + 'work/life-prints.jpg',
    alt: "Prints firmados"
  })))));
}
function PortFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "site-footer",
    id: "contacto-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      padding: '36px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: AP + 'pewi-icon-white.png',
    alt: "PEW1",
    style: {
      height: 28
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      letterSpacing: '.03em',
      color: '#fff'
    }
  }, "\xA9 2026 PEW1 \u2014 Nicolas Sark Pew1. Arte que transforma.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 20,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "youtube",
    size: 20,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 20,
    color: "#fff"
  }))));
}
Object.assign(window, {
  PIEZAS,
  FILTROS,
  PortNav,
  PortHero,
  Galeria,
  PortLightbox,
  Proceso,
  PortFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/portafolio.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/products.jsx
try { (() => {
/* Real catalog from sarkpew1.com (visualization model) + product card/lightbox */
const W = '../../assets/work/';
const clp = n => '$' + n.toLocaleString('es-CL') + ' CLP';
const PRODUCTS = [
// Obras originales
{
  id: 'sombras',
  title: '"Sombras y Vuelo"',
  kind: 'Original Paint',
  cat: 'Originales',
  price: 850000,
  img: W + 'sombras.jpg',
  blurb: 'Óleo sobre tela. Una mujer y un cuervo fundidos en una misma imagen — luz verde y azul sobre fondo profundo.'
}, {
  id: 'rugido',
  title: '"Rugido"',
  kind: 'Original Paint',
  cat: 'Originales',
  price: 950000,
  img: W + 'rugido.jpg',
  blurb: 'Pantera, colibrí y rostro en un mismo gesto: la fuerza y la fragilidad habitando el mismo cuerpo.'
}, {
  id: 'sagrado',
  title: '"Sagrado Prohibido"',
  kind: 'Original Paint',
  cat: 'Originales',
  price: 850000,
  img: W + 'sagrado.jpg',
  blurb: 'Composición original donde lo humano y lo animal se reconocen como una sola naturaleza.'
},
// Fine art prints
{
  id: 'prohibido',
  title: '"Prohibido"',
  kind: 'Fine Art Print',
  cat: 'Prints',
  price: 30000,
  img: W + 'prohibido.jpg',
  blurb: 'Print de edición limitada, serie artista. Impresión fine art de alta fidelidad.'
}, {
  id: 'confianza',
  title: '"Confianza"',
  kind: 'Fine Art Print',
  cat: 'Prints',
  price: 30000,
  img: W + 'confianza.jpg',
  blurb: 'Print de edición limitada, serie artista. Impresión fine art de alta fidelidad.'
}, {
  id: 'jaguar',
  title: 'JAGUAR',
  kind: 'Fine Art Print',
  cat: 'Prints',
  price: 30000,
  img: W + 'jaguar.jpg',
  blurb: 'El jaguar y el rostro humano — print de edición limitada de la serie artista.'
},
// Coleccionables
{
  id: 'st-mural',
  title: 'Set Stickers PEW1 Mural',
  kind: 'Coleccionable',
  cat: 'Coleccionables',
  price: 5000,
  img: W + 'stickers-mural.png',
  sold: true,
  blurb: '5 unidades coleccionables. Stickers troquelados con las obras del muro.'
}, {
  id: 'st-graffiti',
  title: 'Set Stickers PEW1 Graffiti',
  kind: 'Coleccionable',
  cat: 'Coleccionables',
  price: 5000,
  img: W + 'stickers-graffiti.png',
  sold: true,
  blurb: '5 unidades coleccionables. Edición graffiti.'
}, {
  id: 'tazones',
  title: 'Tazones PEW1',
  kind: 'Coleccionable',
  cat: 'Coleccionables',
  price: 12000,
  img: W + 'tazones.jpg',
  sold: true,
  blurb: 'Tazón cerámico con el ícono PEW1.'
}];
function byCat(cat) {
  return PRODUCTS.filter(p => p.cat === cat);
}

/* ---------- PRODUCT CARD ---------- */
function ProductCard({
  p,
  onOpen,
  onAdd
}) {
  return /*#__PURE__*/React.createElement(Card, {
    variant: "poster",
    interactive: true,
    onClick: () => onOpen(p),
    style: {
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4/5',
      background: 'var(--surface-sunken)',
      borderBottom: '2px solid var(--pewi-ink)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), p.sold ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "solid"
  }, "Agotado")) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, p.kind), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontWeight: 800,
      fontSize: 17,
      lineHeight: 1.2,
      color: 'var(--text-strong)'
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, clp(p.price)), p.sold ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    disabled: true
  }, "Agotado") : /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "accent",
    onClick: e => {
      e.stopPropagation();
      onAdd(p);
    }
  }, "A\xF1adir"))));
}

/* ---------- PRODUCT LIGHTBOX ---------- */
function ProductLightbox({
  p,
  onClose,
  onAdd
}) {
  if (!p) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      background: 'rgba(6,10,31,0.86)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    className: "pl-card",
    style: {
      background: 'var(--surface-card)',
      border: '2px solid var(--pewi-ink)',
      boxShadow: 'var(--shadow-hard)',
      maxWidth: 900,
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-sunken)',
      borderRight: '2px solid var(--pewi-ink)',
      minHeight: 280
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '30px 30px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, p.kind), p.sold ? /*#__PURE__*/React.createElement(Badge, {
    variant: "solid"
  }, "Agotado") : null), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 30,
      lineHeight: 1,
      color: 'var(--text-strong)'
    }
  }, p.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, clp(p.price)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--text-body)'
    }
  }, p.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 14
    }
  }, p.sold ? /*#__PURE__*/React.createElement(Button, {
    full: true,
    variant: "secondary",
    disabled: true
  }, "Agotado") : /*#__PURE__*/React.createElement(Button, {
    full: true,
    size: "lg",
    variant: "accent",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "shopping-bag",
      size: 18
    }),
    onClick: () => {
      onAdd(p);
      onClose();
    }
  }, "A\xF1adir al carrito")))));
}
Object.assign(window, {
  PRODUCTS,
  byCat,
  clp,
  ProductCard,
  ProductLightbox
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/products.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/sections.jsx
try { (() => {
/* nav, hero, shop sections, SIZ band, about, footer */
const A2 = '../../assets/';
const NAV = [['shop', 'Shop'], ['portfolio', 'Portfolio'], ['siz', 'SIZ Street Wear'], ['noticias', 'Noticias'], ['contacto', 'Contacto']];

/* ---------- NAV ---------- */
function Nav({
  cartCount,
  onCart,
  onNav
}) {
  const [open, setOpen] = React.useState(false);
  const go = id => {
    setOpen(false);
    onNav(id);
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--pewi-navy)',
      borderBottom: '2px solid var(--pewi-ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      height: 68,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go('top'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A2 + 'pewi-icon-white.png',
    alt: "PEW1",
    style: {
      height: 32
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: A2 + 'pewi-wordmark-white.png',
    alt: "PEW1",
    style: {
      height: 16,
      marginTop: 2
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "nav-links"
  }, NAV.map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    onClick: () => go(id),
    className: "navlink",
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-text)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.06em',
      color: 'var(--text-on-dark)',
      textTransform: 'uppercase'
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCart,
    "aria-label": "Carrito",
    style: {
      position: 'relative',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      display: 'inline-flex',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shopping-bag",
    size: 22,
    color: "#fff"
  }), cartCount > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -4,
      right: -6,
      minWidth: 18,
      height: 18,
      padding: '0 4px',
      background: 'var(--accent)',
      color: 'var(--pewi-ink)',
      borderRadius: 999,
      fontFamily: 'var(--font-text)',
      fontSize: 11,
      fontWeight: 800,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1.5px solid var(--pewi-ink)'
    }
  }, cartCount) : null), /*#__PURE__*/React.createElement("button", {
    className: "menu-btn",
    onClick: () => setOpen(o => !o),
    "aria-label": "Men\xFA",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'x' : 'menu',
    size: 24,
    color: "#fff"
  })))), open ? /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu",
    style: {
      borderTop: '1px solid var(--border-on-dark)',
      background: 'var(--pewi-navy)',
      padding: '10px 0 16px'
    }
  }, NAV.map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    onClick: () => go(id),
    style: {
      display: 'block',
      padding: '13px 28px',
      cursor: 'pointer',
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: '0.05em',
      color: 'var(--text-on-dark)',
      textTransform: 'uppercase',
      borderBottom: '1px solid var(--border-on-dark)'
    }
  }, label))) : null);
}

/* ---------- HERO (full-bleed gallery) ---------- */
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 'min(86vh,720px)',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      background: 'var(--pewi-ink)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A2 + 'work/hero.png',
    alt: "Galer\xEDa PEW1",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(10,15,46,0.30) 0%, rgba(10,15,46,0.10) 40%, rgba(10,15,46,0.92) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: 'relative',
      padding: '0 28px 64px',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 6,
      height: 24,
      background: 'var(--accent)',
      borderRadius: 3,
      transform: 'rotate(-22deg)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 6,
      height: 24,
      background: 'var(--accent)',
      borderRadius: 3
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 6,
      height: 24,
      background: 'var(--accent)',
      borderRadius: 3,
      transform: 'rotate(22deg)'
    }
  })), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title",
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 'clamp(2.4rem,6vw,4.8rem)',
      lineHeight: 0.96,
      letterSpacing: '-0.01em',
      margin: 0,
      maxWidth: 780
    }
  }, "El ser humano", /*#__PURE__*/React.createElement("br", null), "y lo ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "salvaje"), ",", /*#__PURE__*/React.createElement("br", null), "una sola imagen"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'clamp(15px,2vw,18px)',
      lineHeight: 1.55,
      color: 'var(--text-on-dark)',
      maxWidth: 560,
      margin: '22px 0 30px'
    }
  }, "Mi obra explora la relaci\xF3n entre el ser humano y el mundo animal a trav\xE9s de composiciones que los integran en una misma imagen. \u2014 Nicolas Sark Pew1."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => onNav('originales')
  }, "Obras originales"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav('shop'),
    style: {
      color: '#fff',
      borderColor: '#fff'
    }
  }, "Ver shop"))));
}

/* ---------- SHOP SECTION (reusable) ---------- */
function ShopSection({
  id,
  label,
  title,
  cat,
  dark = false,
  onOpen,
  onAdd
}) {
  const items = byCat(cat);
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: dark ? 'var(--pewi-navy)' : 'var(--surface-page)',
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    rule: true,
    color: dark ? 'var(--accent)' : undefined
  }, label), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(1.8rem,4vw,2.8rem)',
      lineHeight: 1,
      margin: '16px 0 32px',
      color: dark ? '#fff' : 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, items.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    p: p,
    onOpen: onOpen,
    onAdd: onAdd
  })))));
}

/* ---------- SIZ STREET WEAR BAND ---------- */
function SizBand({}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "siz",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--pewi-ink)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A2 + 'work/siz-streetwear.jpg',
    alt: "SIZ Street Wear",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(11,11,13,0.86) 0%, rgba(11,11,13,0.55) 60%, rgba(11,11,13,0.3) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: 'relative',
      padding: '88px 28px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "accent"
  }, "Nuevo lanzamiento"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 'clamp(2rem,5vw,3.6rem)',
      lineHeight: 1,
      margin: '18px 0 14px',
      maxWidth: 560
    }
  }, "SIZ Street Wear"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--text-on-dark)',
      maxWidth: 480,
      margin: '0 0 28px'
    }
  }, "Nueva l\xEDnea de ropa de calle del universo PEW1. Preventa oficial abierta."), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg"
  }, "Preventa oficial")));
}

/* ---------- ABOUT ---------- */
function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "portfolio",
    style: {
      background: 'var(--surface-card)',
      padding: '76px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap about-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--pewi-ink)',
      boxShadow: 'var(--shadow-hard)',
      overflow: 'hidden',
      aspectRatio: '4/3'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A2 + 'work/life-studio.jpg',
    alt: "Estudio PEW1",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    rule: true
  }, "El artista"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(1.8rem,3.6vw,2.8rem)',
      lineHeight: 1.02,
      margin: '16px 0 18px',
      color: 'var(--text-strong)'
    }
  }, "Nicolas Sark Pew1"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--text-body)',
      margin: '0 0 16px'
    }
  }, "Artista urbano. Mi trabajo integra el rostro humano y el mundo animal en una misma composici\xF3n: cuervos, panteras, jaguares y colibr\xEDes que conviven con la piel y la mirada."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--text-body)',
      margin: '0 0 26px'
    }
  }, "Del muro a la tela y al print de edici\xF3n limitada \u2014 arte que transforma espacios y conecta emociones."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Conoce mi trabajo"))));
}

/* ---------- FOOTER ---------- */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--pewi-navy)',
      color: 'var(--text-on-dark-mut)',
      borderTop: '2px solid var(--pewi-ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap footer-row",
    style: {
      padding: '36px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A2 + 'pewi-icon-white.png',
    alt: "PEW1",
    style: {
      height: 28
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 13,
      letterSpacing: '0.03em'
    }
  }, "\xA9 2026 Nicolas Sark Pew1 \u2014 Arte que transforma.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 20,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "youtube",
    size: 20,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 20,
    color: "#fff"
  }))));
}
Object.assign(window, {
  Nav,
  Hero,
  ShopSection,
  SizBand,
  About,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

})();
