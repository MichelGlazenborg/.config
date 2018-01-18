#!/usr/bin/bash

barpid="$$"
trap 'trap - TERM; kill 0' INT TERM QUIT EXIT
if [ $(pgrep -cx lemonbar) -gt 0 ] ; then
	printf "%s\n" "The panel is already running." >&2
	exit 1
fi
fifo="/tmp/panel_fifo"
[ -e "$fifo" ] && rm "$fifo"
mkfifo "$fifo"

Clock() {
	echo -e "Clock $(~/.config/lemonbar/blocks/calendar) $(~/.config/lemonbar/blocks/time)"
}

Battery() {
	echo "Battery "$(~/.config/lemonbar/blocks/battery)
}

Volume() {
	echo -e "Volume "$(~/.config/lemonbar/blocks/volume)
}

Network() {
	echo -e "Network "$(~/.config/lemonbar/blocks/network)
}

while :; do Volume; sleep 0.1s; done > "$fifo" &
while :; do Clock; sleep 1s; done > "$fifo" &
while :; do Battery; sleep 6s; done > "$fifo" &
while :; do Network; sleep 2s; done > "$fifo" &

python /home/mglazenborg/.config/lemonbar/events.py &


#testinfo="%{B#4D5764}%{T4}%{+u}%{U#DDDDDD}%{O#2E343c}  %{-u}%{T-}%{B-}%{B#2E343c}%{F#717C89}%{+u}%{U#717C89}%{O#2E343c}  %{-u}%{T-}%{B-}%{F-}"

while read -r line ; do
    case $line in
        Workspaces*)
            ws="${line:11}"
            ;;
        Volume*)
            vl="%{T4}${line:7}%{T-}"
            ;;
        Clock*)
            cl="${line:5}"
            ;;
        Battery*)
            bt="${line:7}"
            ;;
        Network*)
            nt="${line:7}"
            ;;
        Brightness*)
            bn="${line:10}"
            ;;
    esac
	echo "%{l} %{F#FFFFFF}$nt $testinfo $vl%{F#FFFFFF}  $sp  $rs%{c}%{F#FFFFFF}%{T4}$ws%{T-}%{F-}%{B-}%{r}%{F#FFFFFF}$bn $bt %{A:gsimplecal &:}$cl %{A}%{F-}%{B-}"
done < "$fifo" | lemonbar -f "ProFont for Poweline:size=10" -o -2 -f "FontAwesome:size=10" \
	-o -2.5 -f "Material Icons:size=12" -o -1 -f "ProFont for Poweline:size=10" -o -2 -f "FontAwesome:size=12" -o 0 -u 2 -U "#FFFFFF" -B "#272C33" -g 1920x20+0+0 | sh
	#-o -3 -f "Material Design Icons:size=11" -o -2 -f "Hack:size=10" -o -2 -f "Material Icons:size=13" -o -1 -u 2 -U "#FFFFFF" -B "#272C33" -g 1920x20+0+0 | sh