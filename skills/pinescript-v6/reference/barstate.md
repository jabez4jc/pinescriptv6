# `barstate.*` namespace

Source: https://www.tradingview.com/pine-script-reference/v6/

## Variables

### barstate.isconfirmed

Returns true if the script is calculating the last (closing) update of the current bar. The next script calculation will be on the new bar data.

Type: `series bool`

**Remarks**

Pine Script® code that uses this variable could calculate differently on history and real-time data.

It is NOT recommended to use `barstate.isconfirmed` in `request.security()` expression. Its value requested from `request.security()` is unpredictable.

**See also:** `barstate.isfirst`, `barstate.islast`, `barstate.ishistory`, `barstate.isrealtime`, `barstate.isnew`, `barstate.islastconfirmedhistory`

### barstate.isfirst

Returns true if current bar is first bar in barset, false otherwise.

Type: `series bool`

**Remarks**

Pine Script® code that uses this variable could calculate differently on history and real-time data.

Please note that using this variable/function can cause [indicator repainting](../concepts/repainting.md).

**See also:** `barstate.islast`, `barstate.ishistory`, `barstate.isrealtime`, `barstate.isnew`, `barstate.isconfirmed`, `barstate.islastconfirmedhistory`

### barstate.ishistory

Returns true if current bar is a historical bar, false otherwise.

Type: `series bool`

**Remarks**

Pine Script® code that uses this variable could calculate differently on history and real-time data.

Please note that using this variable/function can cause [indicator repainting](../concepts/repainting.md).

**See also:** `barstate.isfirst`, `barstate.islast`, `barstate.isrealtime`, `barstate.isnew`, `barstate.isconfirmed`, `barstate.islastconfirmedhistory`

### barstate.islast

Returns true if current bar is the last bar in barset, false otherwise. This condition is true for all real-time bars in barset.

Type: `series bool`

**Remarks**

Pine Script® code that uses this variable could calculate differently on history and real-time data.

Please note that using this variable/function can cause [indicator repainting](../concepts/repainting.md).

**See also:** `barstate.isfirst`, `barstate.ishistory`, `barstate.isrealtime`, `barstate.isnew`, `barstate.isconfirmed`, `barstate.islastconfirmedhistory`

### barstate.islastconfirmedhistory

Returns true if script is executing on the dataset's last bar when market is closed, or script is executing on the bar immediately preceding the real-time bar, if market is open. Returns false otherwise.

Type: `series bool`

**Remarks**

Pine Script® code that uses this variable could calculate differently on history and real-time data.

Please note that using this variable/function can cause [indicator repainting](../concepts/repainting.md).

**See also:** `barstate.isfirst`, `barstate.islast`, `barstate.ishistory`, `barstate.isrealtime`, `barstate.isnew`

### barstate.isnew

Returns true if script is currently calculating on new bar, false otherwise. This variable is true when calculating on historical bars or on first update of a newly generated real-time bar.

Type: `series bool`

**Remarks**

Pine Script® code that uses this variable could calculate differently on history and real-time data.

Please note that using this variable/function can cause [indicator repainting](../concepts/repainting.md).

**See also:** `barstate.isfirst`, `barstate.islast`, `barstate.ishistory`, `barstate.isrealtime`, `barstate.isconfirmed`, `barstate.islastconfirmedhistory`

### barstate.isrealtime

Returns true if current bar is a real-time bar, false otherwise.

Type: `series bool`

**Remarks**

Pine Script® code that uses this variable could calculate differently on history and real-time data.

Please note that using this variable/function can cause [indicator repainting](../concepts/repainting.md).

**See also:** `barstate.isfirst`, `barstate.islast`, `barstate.ishistory`, `barstate.isnew`, `barstate.isconfirmed`, `barstate.islastconfirmedhistory`
