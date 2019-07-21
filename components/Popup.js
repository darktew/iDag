import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import Dialog, { SlideAnimation, DialogTitle, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';

export const PopupContainer = (props) => {
    return (
        <Dialog
            visible={props.visibleItem}
            dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom'
            })}
            width={ props.widthPopup || Dimensions.get('window').width}

            dialogStyle={props.stylePop}
            
        >
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogFooter style={{ display: "flex", marginLeft: 25, marginRight: 25, marginBottom: 40 , borderTopWidth: 0}}>
                <DialogButton 
                    text="ยกเลิก"
                    textStyle={{ fontFamily: 'rsuBold', fontSize: 20, color: '#fff' }}
                    style={{ backgroundColor: '#9B9797', borderRadius: 5, width: 40, marginRight: 20  }}
                    onPress={() => props.funcClose()}

                />
                <DialogButton 
                    text="ยืนยัน"
                    textStyle={{ fontFamily: 'rsuBold', fontSize: 20, color: '#fff' }}
                    style={{ backgroundColor: '#EB0000', borderRadius: 5, width: 40 }}
                    onPress={() => props.funcSubmit()}

                />
            </DialogFooter>
        </Dialog>
    )
};
